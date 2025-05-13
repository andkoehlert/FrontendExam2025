// composables/useImageUploader.ts
import { ref } from "vue";

interface UploadResponse {
  url: string;
}

export function useImageUploadForCreate() {
  const imageUrl = ref<string | null>(null);
  const previewUrl = ref<string | null>(null);  // This will store the image preview URL

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return null;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB size limit
      alert('Image size should be less than 5MB');
      return null;
    }

    try {
      // Preview the image
      previewUrl.value = URL.createObjectURL(file);  // Create a local preview URL

      const formData = new FormData();
      formData.append('image', file);

      const response = await $fetch<UploadResponse>('https://fullstackexam2025backend.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
          credentials: 'include',  // Add this line to send cookies

      });

      imageUrl.value = response.url;  // Store the actual uploaded image URL
      return imageUrl.value;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed. Please try again.');
      return null;
    }
  };

  return { uploadImage, imageUrl, previewUrl };
}
