export interface BlueprintAnalysisResult {
    text: string;
    timestamp: string;
  }
  
  export interface BlueprintError {
    message: string;
    code?: string;
  }
  
  export interface AnalysisItem {
    category: string;
    details: string[];
    status: 'pass' | 'fail' | 'warning';
  }