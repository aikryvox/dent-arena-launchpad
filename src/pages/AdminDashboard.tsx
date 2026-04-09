import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminLoggedIn, removeAdminToken } from "@/lib/adminAuth";
import { saveImage, deleteImage, fileToBase64, getImagesByType } from "@/lib/imageStorage";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, LogOut, Plus } from "lucide-react";
import type { StoredImage } from "@/lib/imageStorage";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"doctor" | "gallery">("doctor");
    const [images, setImages] = useState<StoredImage[]>([]);
    const [doctorCount, setDoctorCount] = useState(0);
    const [galleryCount, setGalleryCount] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!isAdminLoggedIn()) {
            navigate("/admin");
            return;
        }
        loadImages();
        loadCounts();
    }, [activeTab, navigate]);

    const loadImages = async () => {
        try {
            const stored = await getImagesByType(activeTab);
            setImages(stored);
        } catch (error) {
            console.error("Error loading images:", error);
            setMessage("Error loading images");
        }
    };

    const loadCounts = async () => {
        try {
            const doctors = await getImagesByType("doctor");
            const galleries = await getImagesByType("gallery");
            setDoctorCount(doctors.length);
            setGalleryCount(galleries.length);
        } catch (error) {
            console.error("Error loading counts:", error);
        }
    };

    const handleLogout = () => {
        removeAdminToken();
        navigate("/admin");
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const files = input?.files;
        if (!files || files.length === 0) {
            console.log("No files selected");
            return;
        }

        console.log("Starting upload of", files.length, "files");
        setUploading(true);
        setMessage("");

        try {
            let successCount = 0;
            let errorMsg = "";

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                console.log(`Processing file ${i + 1}:`, file.name, file.size, file.type);

                // Validate file
                if (!file.type.startsWith("image/")) {
                    errorMsg = "Only image files are allowed";
                    console.warn("Invalid file type:", file.type);
                    continue;
                }

                if (file.size > 5 * 1024 * 1024) {
                    errorMsg = "File size must be less than 5MB";
                    console.warn("File too large:", file.size);
                    continue;
                }

                try {
                    // Convert to base64 with timeout
                    console.log("Converting file to base64...");
                    const base64Promise = fileToBase64(file);
                    const timeoutPromise = new Promise<string>((_, reject) =>
                        setTimeout(() => reject(new Error("File conversion timeout - took too long")), 30000)
                    );

                    const base64 = await Promise.race([base64Promise, timeoutPromise]);
                    console.log("Base64 conversion complete, size:", base64.length);

                    // Create image object
                    const image: StoredImage = {
                        id: `${activeTab}-${Date.now()}-${i}`,
                        name: `${activeTab}-${Date.now()}-${i}`,
                        type: activeTab,
                        data: base64,
                        uploadedAt: new Date().toISOString(),
                        originalName: file.name,
                    };

                    console.log("Saving image to IndexedDB...", image.id);
                    // Save to IndexedDB
                    await saveImage(image);
                    console.log("Image saved successfully:", image.id);
                    successCount++;
                } catch (err) {
                    errorMsg = `Error processing ${file.name}: ${err instanceof Error ? err.message : "Unknown error"}`;
                    console.error("Error processing file:", err);
                }
            }

            console.log("Upload complete. Success count:", successCount);
            if (successCount > 0) {
                setMessage(`✓ Successfully uploaded ${successCount} image(s)`);
                await loadImages();
                await loadCounts();
            } else if (errorMsg) {
                setMessage(`✗ ${errorMsg}`);
            }

            // Reset input safely
            if (input) {
                input.value = "";
            }
        } catch (error) {
            const errorMessage = `✗ Error uploading images: ${error instanceof Error ? error.message : "Unknown error"}`;
            setMessage(errorMessage);
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this image?")) {
            try {
                await deleteImage(id);
                setMessage("✓ Image deleted successfully");
                await loadImages();
                await loadCounts();
            } catch (error) {
                setMessage(`✗ Error deleting image: ${error instanceof Error ? error.message : "Unknown error"}`);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-foreground">Dent Arena Admin</h1>
                        <p className="text-sm text-muted-foreground">Manage Images</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("doctor")}
                        className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === "doctor"
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Doctors ({doctorCount})
                    </button>
                    <button
                        onClick={() => setActiveTab("gallery")}
                        className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === "gallery"
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Gallery ({galleryCount})
                    </button>
                </div>

                {/* Message */}
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-lg ${message.includes("✗") ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"
                            }`}
                    >
                        {message}
                    </div>
                )}

                {/* Upload Section */}
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 mb-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Upload {activeTab === "doctor" ? "Doctor" : "Gallery"} Images</h3>
                    <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to select images (Max 5MB each)</p>
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            className="hidden"
                        />
                        <Button asChild disabled={uploading} className="gap-2">
                            <span>
                                <Plus className="w-4 h-4" />
                                {uploading ? "Uploading..." : "Select Images"}
                            </span>
                        </Button>
                    </label>
                </div>

                {/* Images Grid */}
                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        {activeTab === "doctor" ? "Doctor Images" : "Gallery Images"} ({images.length})
                    </h3>

                    {images.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                            <p className="text-muted-foreground">No images uploaded yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image) => (
                                <div key={image.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                                    <div className="aspect-square bg-gray-100 overflow-hidden">
                                        <img src={image.data} alt={image.originalName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs text-muted-foreground truncate mb-2">{image.originalName}</p>
                                        <p className="text-xs text-gray-400 mb-3">{new Date(image.uploadedAt).toLocaleDateString()}</p>
                                        <button
                                            onClick={() => handleDelete(image.id)}
                                            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors text-sm font-medium"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Storage Info */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                        <strong>Note:</strong> Images are stored in browser IndexedDB. Storage capacity is much larger than localStorage (~50MB+).
                        They will persist across sessions but may be cleared if browser data is deleted.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
