import { validateImage } from './validation/validator';

export function processImageData(imageBase64: string): string {
  if (!imageBase64.includes('base64,')) {
    throw new Error('Invalid image format');
  }

  const base64Data = imageBase64.split('base64,')[1];
  
  if (!base64Data) {
    throw new Error('Invalid image data');
  }

  return base64Data;
}

export function validateImageFile(file: File): void {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload a valid image file');
  }
}

export const validateBlueprintImage = validateImage;