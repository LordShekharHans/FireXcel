import { ValidationResult, ImageDimensions } from './types';
import { MIN_DIMENSION } from './constants';

export function validateDimensions(dimensions: ImageDimensions): ValidationResult {
  if (dimensions.width < MIN_DIMENSION || dimensions.height < MIN_DIMENSION) {
    return {
      isValid: false,
      reason: 'The image resolution is too low. Please upload a higher quality image.'
    };
  }
  return { isValid: true };
}