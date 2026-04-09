// Image storage management using IndexedDB
// Stores images with metadata (much larger storage capacity than localStorage)

export interface StoredImage {
    id: string;
    name: string;
    type: string; // 'doctor' or 'gallery'
    data: string; // base64 encoded image
    uploadedAt: string;
    originalName: string;
}

const DB_NAME = "DentArenaDB";
const STORE_NAME = "images";
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error("IndexedDB open error:", request.error);
            reject(request.error);
        };

        request.onsuccess = () => {
            db = request.result;
            console.log("IndexedDB initialized successfully");
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const database = (event.target as IDBOpenDBRequest).result;
            console.log("IndexedDB upgrade needed");
            if (!database.objectStoreNames.contains(STORE_NAME)) {
                database.createObjectStore(STORE_NAME, { keyPath: "id" });
                console.log("Object store created");
            }
        };
    });
};

export const getStoredImages = async (): Promise<StoredImage[]> => {
    try {
        const database = await initDB();
        return new Promise((resolve, reject) => {
            try {
                const transaction = database.transaction(STORE_NAME, "readonly");
                const store = transaction.objectStore(STORE_NAME);
                const request = store.getAll();

                request.onerror = () => {
                    console.error("Error getting images:", request.error);
                    reject(request.error);
                };

                request.onsuccess = () => {
                    console.log("Images retrieved:", request.result.length);
                    resolve(request.result as StoredImage[]);
                };

                transaction.onerror = () => {
                    console.error("Transaction error:", transaction.error);
                    reject(transaction.error);
                };
            } catch (err) {
                console.error("Transaction creation error:", err);
                reject(err);
            }
        });
    } catch (error) {
        console.error("Error reading stored images:", error);
        return [];
    }
};

export const saveImage = async (image: StoredImage): Promise<void> => {
    try {
        console.log("Saving image:", image.id);
        const database = await initDB();
        return new Promise((resolve, reject) => {
            try {
                const transaction = database.transaction(STORE_NAME, "readwrite");
                const store = transaction.objectStore(STORE_NAME);
                const request = store.put(image);

                request.onerror = () => {
                    console.error("Error saving image:", request.error);
                    reject(request.error);
                };

                request.onsuccess = () => {
                    console.log("Image saved successfully:", image.id);
                    resolve();
                };

                transaction.onerror = () => {
                    console.error("Transaction error during save:", transaction.error);
                    reject(transaction.error);
                };

                transaction.oncomplete = () => {
                    console.log("Transaction completed for image:", image.id);
                };
            } catch (err) {
                console.error("Transaction creation error during save:", err);
                reject(err);
            }
        });
    } catch (error) {
        console.error("Error saving image:", error);
        throw new Error(`Failed to save image: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
};

export const deleteImage = async (id: string): Promise<void> => {
    try {
        console.log("Deleting image:", id);
        const database = await initDB();
        return new Promise((resolve, reject) => {
            try {
                const transaction = database.transaction(STORE_NAME, "readwrite");
                const store = transaction.objectStore(STORE_NAME);
                const request = store.delete(id);

                request.onerror = () => {
                    console.error("Error deleting image:", request.error);
                    reject(request.error);
                };

                request.onsuccess = () => {
                    console.log("Image deleted successfully:", id);
                    resolve();
                };

                transaction.onerror = () => {
                    console.error("Transaction error during delete:", transaction.error);
                    reject(transaction.error);
                };
            } catch (err) {
                console.error("Transaction creation error during delete:", err);
                reject(err);
            }
        });
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
    }
};

export const getImagesByType = async (type: "doctor" | "gallery"): Promise<StoredImage[]> => {
    try {
        const images = await getStoredImages();
        const filtered = images.filter((img) => img.type === type);
        console.log(`Retrieved ${filtered.length} ${type} images`);
        return filtered;
    } catch (error) {
        console.error("Error getting images by type:", error);
        return [];
    }
};

export const getImageById = async (id: string): Promise<StoredImage | undefined> => {
    const images = await getStoredImages();
    return images.find((img) => img.id === id);
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const result = reader.result as string;
                    console.log("File converted to base64, size:", result.length);
                    resolve(result);
                } catch (err) {
                    console.error("Error in onload:", err);
                    reject(err);
                }
            };

            reader.onerror = () => {
                console.error("FileReader error:", reader.error);
                reject(new Error(`FileReader error: ${reader.error}`));
            };

            reader.onabort = () => {
                console.error("FileReader aborted");
                reject(new Error("FileReader was aborted"));
            };

            console.log("Starting FileReader for file:", file.name, "size:", file.size);
            reader.readAsDataURL(file);
        } catch (err) {
            console.error("Error creating FileReader:", err);
            reject(err);
        }
    });
};
