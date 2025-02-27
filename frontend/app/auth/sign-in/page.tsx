'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { OTPInput } from '@/components/auth/otp/OTPInput';
import { useOTP } from '@/hooks/useOTP';
import { authApi } from '@/lib/api/auth';

export default function SignIn() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const { 
    otp, 
    isVerifying,
    handleInputChange, 
    handleKeyDown, 
    verifyOTP, 
    clearOTP,
    isComplete 
  } = useOTP();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!showOTP) {
        // Send OTP first
        await authApi.sendOTP(email);
        setShowOTP(true);
        toast({
          title: 'OTP Sent',
          description: 'Please check your email for the OTP code.',
        });
      } else {
        // Verify OTP and login
        const isValid = await verifyOTP();
        if (isValid) {
          const user = await login(email, password);
          const redirectPath = `/user/${user.role.toLowerCase()}`;
          router.push(redirectPath);
        } else {
          toast({
            title: 'Invalid OTP',
            description: 'Please enter the correct OTP code.',
            variant: 'destructive',
          });
          clearOTP();
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>{showOTP ? 'Enter OTP' : 'Sign In'}</CardTitle>
          <CardDescription>
            {showOTP 
              ? 'Enter the OTP code sent to your email'
              : 'Enter your credentials to access your account'
            }
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!showOTP ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </>
            ) : (
              <OTPInput 
                otp={otp}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || isVerifying || (showOTP && !isComplete)}
            >
              {isLoading || isVerifying 
                ? 'Please wait...' 
                : showOTP 
                  ? 'Verify OTP' 
                  : 'Sign In'
              }
            </Button>
            {showOTP && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowOTP(false);
                  clearOTP();
                }}
              >
                Back to Sign In
              </Button>
            )}
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}