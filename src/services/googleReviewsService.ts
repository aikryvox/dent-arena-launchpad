import axios from 'axios';
import {
    getStoredReviews,
    saveReviews,
    shouldUpdateReviews,
    getNextUpdateTime,
    StoredReviews,
} from './reviewsStorageService';
import fallbackReviewsData from '@/data/googleReviews.json';

export interface GoogleReview {
    id: string;
    author: string;
    rating: number;
    date: string;
    text: string;
    verified: boolean;
    profilePhotoUrl?: string;
    relativeTimeDescription?: string;
}

export interface GooglePlaceDetails {
    rating: number;
    reviewCount: number;
    reviews: GoogleReview[];
}

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '';
const PLACE_ID = 'ChIJlQOoS21O4DsRXI9l6IWp4dA'; // Dent Arena Place ID

/**
 * Fetch Google reviews from API (called only once every 5 days)
 * Results are stored in localStorage
 */
export const fetchGoogleReviews = async (): Promise<GooglePlaceDetails | null> => {
    try {
        // Check if we have cached reviews and they're still valid
        if (!shouldUpdateReviews()) {
            const stored = getStoredReviews();
            if (stored) {
                console.log('Using cached reviews (next update in 5 days)');
                return {
                    rating: stored.rating,
                    reviewCount: stored.reviewCount,
                    reviews: stored.reviews,
                };
            }
        }

        // Need to fetch fresh reviews from API
        if (!GOOGLE_PLACES_API_KEY) {
            console.warn('Google Places API key not configured. Using JSON fallback reviews.');
            return getFallbackReviews();
        }

        console.log('Fetching fresh reviews from Google Places API...');

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json`,
            {
                params: {
                    place_id: PLACE_ID,
                    key: GOOGLE_PLACES_API_KEY,
                    fields: 'rating,review,user_ratings_total',
                },
            }
        );

        if (response.data.status === 'OK' && response.data.result) {
            const result = response.data.result;

            const reviews: GoogleReview[] = (result.reviews || []).map((review: any, index: number) => ({
                id: `${index}-${Date.now()}`,
                author: review.author_name || 'Anonymous',
                rating: review.rating || 5,
                date: review.relative_time_description || 'Recently',
                text: review.text || '',
                verified: true,
                profilePhotoUrl: review.profile_photo_url,
                relativeTimeDescription: review.relative_time_description,
            }));

            // Store reviews in localStorage
            const storedData: StoredReviews = {
                reviews: reviews.slice(0, 6),
                rating: result.rating || 4.9,
                reviewCount: result.user_ratings_total || 0,
                lastUpdated: new Date().toISOString(),
                nextUpdateTime: getNextUpdateTime(),
            };

            saveReviews(storedData);
            console.log('Reviews fetched and stored successfully');

            return {
                rating: storedData.rating,
                reviewCount: storedData.reviewCount,
                reviews: storedData.reviews,
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        return null;
    }
};

/**
 * Get reviews from cache or API
 * Prioritizes cached reviews to minimize API calls
 */
export const getReviews = async (): Promise<GooglePlaceDetails | null> => {
    // First, try to get cached reviews
    const cached = getStoredReviews();
    if (cached && !shouldUpdateReviews()) {
        return {
            rating: cached.rating,
            reviewCount: cached.reviewCount,
            reviews: cached.reviews,
        };
    }

    // If cache is stale or doesn't exist, fetch fresh reviews
    return fetchGoogleReviews();
};

/**
 * Get fallback reviews (used when API is not configured)
 */
export const getFallbackReviews = (): GooglePlaceDetails => {
    return {
        rating: fallbackReviewsData.rating,
        reviewCount: fallbackReviewsData.reviewCount,
        reviews: fallbackReviewsData.reviews,
    };
};
