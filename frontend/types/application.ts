export interface Application {
  application_form: any;
  documents: any;
  applicationId: number;
  userId: number;
  inspectionId: number | null;
  applicationStatusId: number;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  user: {
    userId: number;
    name: string;
    email: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
  };
  application_status: {
    applicationStatusId: number;
    code: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export type ApplicationStatus = 
  | 'PENDING'
  | 'SUBMITTED'
  | 'UNDER REVIEW'
  | 'STAGE 1 APPROVED'
  | 'FSC APPLIED'
  | 'INSPECTION SCHEDULED'
  | 'INSPECTION COMPLETED'
  | 'NOC APPROVED'
  | 'NOC REJECTED';

export interface ApplicationsState {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  fetchApplications: () => Promise<void>;
  updateApplicationStatus: (id: number, statusId: number) => Promise<void>;
}


export interface ApplicationForm {
  provisionOfStaircase: boolean;
  fireTower: boolean;
  fireCheckDoor: boolean;
  pressurization: boolean;
  exitSignage: boolean;
  firemansGroundingSwitch: boolean;
  // Add other properties as needed
}