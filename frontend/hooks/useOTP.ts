import { useState } from 'react';
import { focusNextInput, focusPreviousInput, formatOTP } from '@/lib/utils/otp';
import { authApi } from '@/lib/api/auth';

export function useOTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value) {
      focusNextInput(index);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index]) {
      focusPreviousInput(index);
    }
  };

  const verifyOTP = async () => {
    setIsVerifying(true);
    try {
      const otpString = formatOTP(otp);
      const isValid = await authApi.verifyOTP(otpString);
      return isValid;
    } finally {
      setIsVerifying(false);
    }
  };

  const clearOTP = () => {
    setOtp(['', '', '', '']);
    document.getElementById('otp-0')?.focus();
  };

  return {
    otp,
    isVerifying,
    handleInputChange,
    handleKeyDown,
    verifyOTP,
    clearOTP,
    isComplete: otp.every(digit => digit !== '')
  };
}