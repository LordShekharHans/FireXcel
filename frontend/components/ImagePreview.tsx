import Image from "next/image";
import { Button } from "./ui/button";

interface ImagePreviewProps {
    imageUrl: string;
    onAnalyze: () => void;
    isLoading: boolean;
  }
  
  export default function ImagePreview({ imageUrl, onAnalyze, isLoading }: ImagePreviewProps) {
    return (
      <div className="space-y-4 flex flex-col justify-center items-center">
        <Image
          src={imageUrl}
          alt="Blueprint Preview"
          className="max-w-full h-auto border rounded-lg"
          width={800}
          height={600}
        />
        <Button
          onClick={onAnalyze}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Blueprint'}
        </Button>
      </div>
    );
  }