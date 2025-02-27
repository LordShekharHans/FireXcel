export interface Inspection {
  inspectionId: number;
  applicationId: number;
  inspectorId: number;
  inspectionDate: string;
  result: string;
  comments: string | null;
  region?: string;
}

export interface InspectionStats {
  total: number;
  completed: number;
  applied: number;
  rejected: number;
}