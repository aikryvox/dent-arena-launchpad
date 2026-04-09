import { Star, Loader, RefreshCw } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { LOCATION } from "@/lib/constants";
import { getCacheStatus, clearStoredReviews } from "@/services/reviewsStorageService";
import { useState, useEffect } from "react";

const GoogleReviewsSection = () => {
    const { data: reviewsData, isLoading, error } = useGoogleReviews();
    const [cacheStatus, setCacheStatus] = useState<any>(null);

    useEffect(() => {
        setCacheStatus(getCacheStatus());
    }, []);

    const handleRefreshReviews = () => {
        clearStoredReviews();
        window.location.reload();
    };

    if (isLoading) {
        return (
            <section id="google-reviews" className="section-padding bg-background">
                <div className="container-max">
                    <div className="text-center mb-12">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                            Google Reviews
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
                            Trusted by Our Community
                        </h2>
                    </div>
                    <div className="flex items-center justify-center py-12">
                        <Loader className="w-8 h-8 text-primary animate-spin" />
                        <span className="ml-3 text-muted-foreground">Loading reviews...</span>
                    </div>
                </div>
            </section>
        );
    }

    const reviews = reviewsData?.reviews || [];
    const rating = reviewsData?.rating || 4.9;
    const reviewCount = reviewsData?.reviewCount || 0;

    return (
        <section id="google-reviews" className="section-padding bg-background">
            <div className="container-max">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                        Google Reviews
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
                        Trusted by Our Community
                    </h2>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-5 h-5"
                            width={20}
                            height={20}
                        />
                        <span className="font-bold text-foreground text-lg">{rating.toFixed(1)}</span>
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-muted-foreground text-sm">
                            ({reviewCount}+ reviews on Google)
                        </span>
                    </div>
                </div>

                {/* Reviews Grid */}
                {reviews.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-section-alt rounded-xl p-6 border border-transparent hover:border-primary/20 transition-colors"
                            >
                                {/* Rating */}
                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-4">
                                    "{review.text}"
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">
                                            {review.author}
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {review.relativeTimeDescription || review.date}
                                        </p>
                                    </div>
                                    {review.verified && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                            Verified
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            No reviews available at the moment. Check back soon!
                        </p>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center mt-12">
                    <a
                        href={LOCATION.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                        View all reviews on Google Maps →
                    </a>
                </div>

                {/* Cache Status Info */}
                {/* {cacheStatus && (
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
                            <div className="text-sm text-blue-800">
                                <p className="font-semibold mb-1">📦 Reviews Cache Status</p>
                                <p>Last updated: {cacheStatus.lastUpdated || 'Never'}</p>
                                <p>Next update: {cacheStatus.nextUpdateTime || 'N/A'}</p>
                                {cacheStatus.daysUntilUpdate !== null && (
                                    <p>Days until next update: {cacheStatus.daysUntilUpdate}</p>
                                )}
                            </div>
                            {cacheStatus.hasCachedReviews && (
                                <button
                                    onClick={handleRefreshReviews}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh Now
                                </button>
                            )}
                        </div>
                    </div>
                )} */}

                {/* Error Status */}
                {/* {error && (
                    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                        <p className="text-sm text-yellow-800">
                            ⚠️ Showing cached reviews. Live reviews will update when Google Places API is configured.
                        </p>
                    </div>
                )} */}
            </div>
        </section>
    );
};

export default GoogleReviewsSection;
