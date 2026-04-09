/**
 * Reviews Storage Service
 * Manages reading/writing reviews to JSON file
 * Stores reviews locally to reduce API calls
 */

export interface StoredReviews {
    reviews: any[];
    rating: number;
    reviewCount: number;
    lastUpdated: string;
    nextUpdateTime: string;
}

const STORAGE_KEY = 'dent_arena_reviews';
const CACHE_DURATION_DAYS = 5;

/**
 * Get reviews from localStorage
 */
export const getStoredReviews = (): StoredReviews | null => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const data = JSON.parse(stored) as StoredReviews;
        return data;
    } catch (error) {
        console.error('Error reading stored reviews:', error);
        return null;
    }
};

/**
 * Save reviews to localStorage
 */
export const saveReviews = (data: StoredReviews): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving reviews:', error);
    }
};

/**
 * Check if reviews need to be updated (older than 5 days)
 */
export const shouldUpdateReviews = (): boolean => {
    const stored = getStoredReviews();
    if (!stored) return true; // No reviews stored, need to fetch

    try {
        const lastUpdated = new Date(stored.lastUpdated);
        const now = new Date();
        const daysDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);

        return daysDiff >= CACHE_DURATION_DAYS;
    } catch (error) {
        console.error('Error checking update time:', error);
        return true; // If error, fetch fresh reviews
    }
};

/**
 * Calculate next update time (5 days from now)
 */
export const getNextUpdateTime = (): string => {
    const nextUpdate = new Date();
    nextUpdate.setDate(nextUpdate.getDate() + CACHE_DURATION_DAYS);
    return nextUpdate.toISOString();
};

/**
 * Export reviews as JSON file (for backup/download)
 */
export const exportReviewsAsJSON = (): void => {
    const stored = getStoredReviews();
    if (!stored) {
        console.warn('No reviews to export');
        return;
    }

    const dataStr = JSON.stringify(stored, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dent-arena-reviews-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

/**
 * Clear stored reviews
 */
export const clearStoredReviews = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing reviews:', error);
    }
};

/**
 * Get cache status info
 */
export const getCacheStatus = () => {
    const stored = getStoredReviews();
    if (!stored) {
        return {
            hasCachedReviews: false,
            lastUpdated: null,
            nextUpdateTime: null,
            daysUntilUpdate: null,
        };
    }

    const lastUpdated = new Date(stored.lastUpdated);
    const nextUpdate = new Date(stored.nextUpdateTime);
    const now = new Date();
    const daysUntilUpdate = Math.ceil((nextUpdate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
        hasCachedReviews: true,
        lastUpdated: lastUpdated.toLocaleDateString(),
        nextUpdateTime: nextUpdate.toLocaleDateString(),
        daysUntilUpdate: Math.max(0, daysUntilUpdate),
    };
};
