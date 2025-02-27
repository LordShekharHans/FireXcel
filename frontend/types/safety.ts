export interface PracticeDetail {
    text: string;
    checked: boolean;
  }
  
  export interface Practice {
    id: string;
    title: string;
    description: string;
    category: string;
    checked: boolean;
    details: PracticeDetail[];
  }