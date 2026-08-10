/**
 * Uploads a file (image) directly to our backend NestJS API server and returns the uploaded image URL.
 * 
 * @param file - The Image file to upload.
 * @returns Promise<string> - The URL of the uploaded image.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://r9m77f0yp91zaqi9xf0jqc9h.200.141.14.181.sslip.io";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const result = await response.json();

    if (result && (result.url || result.data?.url)) {
      const rawUrl = result.url || result.data.url;
      return rawUrl.replace(/https?:\/\/api\.rajseba\.com/g, "https://rajseba-api.onrender.com");
    } else {
      throw new Error(result?.message || "Failed to upload image to server");
    }
  } catch (error: any) {
    console.error("Server upload error:", error);
    throw new Error(error.message || "Image upload failed");
  }
};
