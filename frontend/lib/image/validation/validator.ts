import { ValidationResult } from './types';
import { analyzePixels } from './pixelAnalysis';
import { determineImageCharacteristics } from './imageCharacteristics';
import { validateDimensions } from './dimensionCheck';

export async function validateImage(imageData: string): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      // Create canvas for analysis
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (!ctx) {
        resolve({ 
          isValid: false, 
          reason: 'Unable to analyze image' 
        });
        return;
      }

      // Draw image and get pixel data
      ctx.drawImage(img, 0, 0);
      const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Analyze pixel characteristics
      const pixelAnalysis = analyzePixels(pixelData);
      const characteristics = determineImageCharacteristics(pixelAnalysis);
      
      // Check if it's a photograph
      if (characteristics.isPhotograph && !characteristics.isTechnicalDrawing) {
        resolve({
          isValid: false,
          reason: 'The uploaded file appears to be a photograph. Please upload a blueprint, floor plan, or technical drawing.'
        });
        return;
      }

      // If it's a technical drawing, check dimensions
      if (characteristics.isTechnicalDrawing) {
        const dimensionCheck = validateDimensions({ width: img.width, height: img.height });
        resolve(dimensionCheck);
        return;
      }

      resolve({ isValid: true });
    };

    img.onerror = () => {
      resolve({
        isValid: false,
        reason: 'Failed to load the image. Please ensure it is a valid image file.'
      });
    };

    img.src = imageData;
  });
}