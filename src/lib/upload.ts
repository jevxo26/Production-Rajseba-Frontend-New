/**
 * Uploads a file (image) directly to our backend NestJS API server and returns the uploaded image URL.
 * 
 * @param file - The Image file to upload.
 * @returns Promise<string> - The URL of the uploaded image.
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://rajseba-api.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const result = await response.json();

    if (result && (result.url || result.data?.url)) {
      return result.url || result.data.url;
    } else {
      throw new Error(result?.message || "Failed to upload image to server");
    }
  } catch (error: any) {
    console.error("Server upload error:", error);
    throw new Error(error.message || "Image upload failed");
  }
};
