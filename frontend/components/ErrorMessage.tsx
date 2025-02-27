interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg" role="alert">
      <p className="font-medium">{message}</p>
    </div>
  );
}