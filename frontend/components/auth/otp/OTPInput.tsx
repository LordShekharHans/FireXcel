'use client';

import { Input } from '@/components/ui/input';

interface OTPInputProps {
  otp: string[];
  handleInputChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function OTPInput({ otp, handleInputChange, handleKeyDown }: OTPInputProps) {
  return (
    <div className="flex justify-center gap-2">
      {otp.map((digit, index) => (
        <Input
          key={index}
          id={`otp-${index}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="w-12 h-12 text-center text-2xl"
          value={digit}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
}