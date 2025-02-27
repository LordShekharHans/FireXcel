export interface ChecklistItem {
  heading: string;
  text: string[];
  _id: string;
}

export interface Checklist {
  _id: string;
  application_id: string;
  check_list: ChecklistItem[];
}

export interface ChecklistSection {
  id: string;
  heading: string;
  items: string[];
}