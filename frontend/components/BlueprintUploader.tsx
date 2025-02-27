'use client';

import { useState } from 'react';
import { analyzeBlueprintSafety } from '../lib/gemini/analysis';
import { useImageUpload } from '../hooks/useImageUpload';
import ImagePreview from './ImagePreview';
import ErrorMessage from './ErrorMessage';
import AnalysisResult from './AnalysisResult';
import { BlueprintAnalysisResult } from '../types/blueprint';
import { FileUpload } from './ui/file-upload';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { validateBlueprintImage } from '@/lib/image/processor';

export default function BlueprintUploader() {
  const { image, error, handleImageUpload, setError } = useImageUpload();
  const [analysis, setAnalysis] = useState<BlueprintAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState<string[]>([]);

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    setError('');
    setAnalysis(null);
    
    try {
      const validation = await validateBlueprintImage(image);
      
      if (!validation.isValid) {
        setErrorMessage(validation.reason || 'Invalid image');
        setErrorDetails([
          'A blueprint, floor plan, or technical drawing',
          'Clear and legible text and symbols',
          'Showing emergency exits, routes, and safety features',
          'In a common image format (PNG, JPG, etc.)',
          'Not a general photograph',
          'Sufficient resolution for analysis'
        ]);
        setShowErrorDialog(true);
        return;
      }

      const result = await analyzeBlueprintSafety(image);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? "Failed" : 'Failed to analyze image';
      setErrorMessage(errorMessage);
      setErrorDetails([
        'Check if the file is corrupted',
        'Ensure the image is clear and well-lit',
        'Try uploading in a different format',
        'Make sure all text and symbols are readable'
      ]);
      setShowErrorDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (files: File[]) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        handleImageUpload({ target: { files } } as any);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <FileUpload onChange={handleFileChange} />

        {image && (
          <ImagePreview
            imageUrl={image}
            onAnalyze={handleAnalyze}
            isLoading={loading}
          />
        )}

        {error && <ErrorMessage message={error} />}
        {analysis && <AnalysisResult analysis={analysis.text} />}

        <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Invalid Image Format</AlertDialogTitle>
              <AlertDialogDescription>
                <p className="text-red-500 font-medium mb-4">{errorMessage}</p>
                <div className="mt-4">
                  <p className="font-medium mb-2">Accepted document types:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {errorDetails.map((detail, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{detail}</li>
                    ))}
                  </ul>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction 
                onClick={() => setShowErrorDialog(false)}
                className="bg-primary hover:bg-primary/90"
              >
                Try Again
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}