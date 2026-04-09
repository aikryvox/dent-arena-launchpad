import { useQuery } from '@tanstack/react-query';
import { getReviews, getFallbackReviews, GooglePlaceDetails } from '@/services/googleReviewsService';

/**
 * Custom hook to fetch Google reviews with 5-day caching
 * 
 * Features:
 * - Fetches from Google Places API only once every 5 days
 * - Stores reviews in localStorage (JSON format)
 * - Subsequent visits use cached reviews
 * - Automatic refresh after 5 days
 * - Fallback to static reviews if API fails
 */
export const useGoogleReviews = () => {
    return useQuery<GooglePlaceDetails>({
        queryKey: ['googleReviews'],
        queryFn: async () => {
            const reviews = await getReviews();
            // Use fallback reviews if API fails or is not configured
            return reviews || getFallbackReviews();
        },
        staleTime: 1000 * 60 * 60 * 24 * 5, // 5 days
        gcTime: 1000 * 60 * 60 * 24 * 30, // 30 days (formerly cacheTime)
        retry: 1,
        retryDelay: 1000,
    });
};
