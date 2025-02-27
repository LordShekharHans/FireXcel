import { PracticeDetail } from "@/types/safety";

interface DetailsListProps {
  practiceId: string;
  details: PracticeDetail[];
  onToggleDetail: (id: string, index: number) => void;
}

export default function DetailsList({ practiceId, details, onToggleDetail }: DetailsListProps) {
  return (
    <ul className="mt-3 space-y-2 ml-6">
      {details.map((detail, index) => (
        <li key={index} className="flex items-start">
          <span className="text-sm text-gray-600">{detail.text}</span>
        </li>
      ))}
    </ul>
  );
}