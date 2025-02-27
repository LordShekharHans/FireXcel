import { PixelAnalysis } from './types';
import { MONOCHROME_THRESHOLD, EDGE_DETECTION_THRESHOLD } from './constants';

export function analyzePixels(imageData: ImageData): PixelAnalysis {
  const data = imageData.data;
  let monochromePixels = 0;
  let colorPixels = 0;
  let linePixels = 0;
  const totalPixels = imageData.width * imageData.height;

  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    
    // Check for monochrome pixels
    if (Math.abs(r - g) < MONOCHROME_THRESHOLD && Math.abs(g - b) < MONOCHROME_THRESHOLD) {
      monochromePixels++;
    } else {
      colorPixels++;
    }

    // Edge detection
    if (i % (imageData.width * 4) < data.length - 4) {
      const nextR = data[i + 4];
      if (Math.abs(r - nextR) > EDGE_DETECTION_THRESHOLD) {
        linePixels++;
      }
    }
  }

  return {
    monochromeRatio: monochromePixels / totalPixels,
    lineRatio: linePixels / totalPixels,
    colorRatio: colorPixels / totalPixels,
  };
}