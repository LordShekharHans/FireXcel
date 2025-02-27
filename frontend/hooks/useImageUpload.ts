import { useState } from 'react';
import { validateImageFile } from '../lib/image/processor';

export function useImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError('');
      };
      
      reader.onerror = () => {
        setError('Failed to read the image file');
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    }
  };

  return { image, error, handleImageUpload, setImage, setError };
}