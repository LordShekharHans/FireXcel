export interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

export interface ImageCharacteristics {
  isTechnicalDrawing: boolean;
  isPhotograph: boolean;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface PixelAnalysis {
  monochromeRatio: number;
  lineRatio: number;
  colorRatio: number;
}