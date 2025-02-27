export const focusNextInput = (currentIndex: number) => {
  if (currentIndex < 3) {
    const nextInput = document.getElementById(`otp-${currentIndex + 1}`);
    nextInput?.focus();
  }
};

export const focusPreviousInput = (currentIndex: number) => {
  if (currentIndex > 0) {
    const prevInput = document.getElementById(`otp-${currentIndex - 1}`);
    prevInput?.focus();
  }
};

export const formatOTP = (otp: string[]): string => {
  return otp.join('');
};