interface UploadResponse {
  url: string;
}

export function useImageUploader(editor: any) {
  const uploadImage = async (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await $fetch<UploadResponse>('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
      });

      editor.value.chain().focus()
        .setImage({ src: response.url })
        .run();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed. Please try again.');
    }
  };

  return { uploadImage };
}
