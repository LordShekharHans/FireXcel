import { ImageCharacteristics, PixelAnalysis } from './types';
import { TECHNICAL_DRAWING_THRESHOLDS } from './constants';

export function determineImageCharacteristics(analysis: PixelAnalysis): ImageCharacteristics {
  const {
    MONOCHROME_RATIO,
    LINE_RATIO,
    COLOR_RATIO,
    EDGE_RATIO
  } = TECHNICAL_DRAWING_THRESHOLDS;

  return {
    isTechnicalDrawing: (
      analysis.monochromeRatio > MONOCHROME_RATIO || 
      analysis.lineRatio > LINE_RATIO
    ),
    isPhotograph: (
      analysis.colorRatio > COLOR_RATIO && 
      analysis.lineRatio < EDGE_RATIO
    )
  };
}