import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Car, Mail, Lock, Facebook, Chrome, Apple } from 'lucide-react';

interface LoginFormProps {
  onForgotPassword: () => void;
  onSignUp: () => void;
}

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export function LoginForm({ onForgotPassword, onSignUp }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOtpField, setShowOtpField] = useState(false);
  const [, setAuthToken] = useState<string>('');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!showOtpField) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      if (!formData.otp) {
        newErrors.otp = 'OTP is required';
      } else if (formData.otp.length !== 5) {
        newErrors.otp = 'OTP must be 5 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    if (!showOtpField) {
      // First step: Email verification
      setTimeout(() => {
        setIsLoading(false);
        setShowOtpField(true);
        console.log('Email verification successful, showing OTP field');
      }, 1000);
    } else {
      // Second step: OTP verification
      setTimeout(() => {
        setIsLoading(false);
        
        // Check if OTP is 11111
        if (formData.otp === '11111') {
          // Save the JWT token
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiaW5zcGVjdG9yX3Rlc3RAZ21haWwuY29tIiwicGVybWlzc2lvbnMiOnsibmFtZSI6Ikluc3BlY3RvciIsIlBlcm1pc3Npb24iOlt7InJvbGVJZCI6MywiYXBwTW9kdWxlSWQiOjEsImNyZWF0ZSI6ZmFsc2UsInJlYWQiOnRydWUsInVwZGF0ZSI6dHJ1ZSwiZGVsZXRlIjpmYWxzZSwibW9kdWxlIjp7Im5hbWUiOiJDYXJzIiwicGF0aCI6Ii9kYXNoYm9hcmQvY2FycyJ9fSx7InJvbGVJZCI6MywiYXBwTW9kdWxlSWQiOjIsImNyZWF0ZSI6ZmFsc2UsInJlYWQiOmZhbHNlLCJ1cGRhdGUiOmZhbHNlLCJkZWxldGUiOmZhbHNlLCJtb2R1bGUiOnsibmFtZSI6IlVzZXJzIiwicGF0aCI6Ii9kYXNoYm9hcmQvdXNlcnMifX0seyJyb2xlSWQiOjMsImFwcE1vZHVsZUlkIjozLCJjcmVhdGUiOmZhbHNlLCJyZWFkIjpmYWxzZSwidXBkYXRlIjpmYWxzZSwiZGVsZXRlIjpmYWxzZSwibW9kdWxlIjp7Im5hbWUiOiJSb2xlcyAmIFBlcm1pc3Npb24iLCJwYXRoIjoiL2Rhc2hib2FyZC9yb2xlcy1wZXJtaXNzaW9uIn19LHsicm9sZUlkIjozLCJhcHBNb2R1bGVJZCI6NCwiY3JlYXRlIjpmYWxzZSwicmVhZCI6ZmFsc2UsInVwZGF0ZSI6ZmFsc2UsImRlbGV0ZSI6ZmFsc2UsIm1vZHVsZSI6eyJuYW1lIjoiSW5zcGVjdG9yIiwicGF0aCI6Ii9kYXNoYm9hcmQvaW5zcGVjdG9yIn19LHsicm9sZUlkIjozLCJhcHBNb2R1bGVJZCI6NSwiY3JlYXRlIjp0cnVlLCJyZWFkIjp0cnVlLCJ1cGRhdGUiOnRydWUsImRlbGV0ZSI6dHJ1ZSwibW9kdWxlIjp7Im5hbWUiOiJJbnNwZWN0aW9ucyIsInBhdGgiOiIvZGFzaGJvYXJkL2luc3BlY3Rpb25zIn19LHsicm9sZUlkIjozLCJhcHBNb2R1bGVJZCI6NiwiY3JlYXRlIjpmYWxzZSwicmVhZCI6ZmFsc2UsInVwZGF0ZSI6ZmFsc2UsImRlbGV0ZSI6ZmFsc2UsIm1vZHVsZSI6eyJuYW1lIjoiTm90aWZpY2F0aW9ucyIsInBhdGgiOiIvZGFzaGJvYXJkL25vdGlmaWNhdGlvbnMifX0seyJyb2xlSWQiOjMsImFwcE1vZHVsZUlkIjo3LCJjcmVhdGUiOnRydWUsInJlYWQiOnRydWUsInVwZGF0ZSI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJtb2R1bGUiOnsibmFtZSI6IkJvb2sgQXBwb2ludG1lbnRzIiwicGF0aCI6Ii9kYXNoYm9hcmQvYm9vay1hcHBvaW50bWVudCJ9fV19LCJpYXQiOjE3NTM4MDg0ODAsImV4cCI6MTc1Mzg5NDg4MH0.AMK9r6eLk_WJjmsOJMwS-T_xOefmcn4HeQoYi6PYjYs';
          setAuthToken(token);
          
          // Save user details
          const userData = {
            firstName: 'Test',
            lastName: 'Dev',
            email: 'testdev@gmail.com'
          };
          setUserDetails(userData);
          
          // Store in localStorage for persistence
          localStorage.setItem('authToken', token);
          localStorage.setItem('userDetails', JSON.stringify(userData));
          
          console.log('Login successful!');
          console.log('Auth Token:', token);
          console.log('User Details:', userData);

          window.location.href = '/';
          
          // Here you would typically redirect to dashboard or home page
        } else {
          setErrors({ otp: 'Invalid OTP. Please try again.' });
        }
      }, 1000);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardHeader className="space-y-4 pb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-full shadow-lg">
            <Car className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to your BADDELHA account
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {!showOtpField ? (
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 h-12 transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                Enter OTP
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 5-digit OTP"
                  value={formData.otp}
                  onChange={(e) => handleInputChange('otp', e.target.value)}
                  className={`pl-10 h-12 transition-all duration-200 ${
                    errors.otp 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
                  }`}
                  maxLength={5}
                />
              </div>
              {errors.otp && (
                <p className="text-sm text-red-600 mt-1">{errors.otp}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">For testing, use OTP: 11111</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label 
                htmlFor="remember" 
                className="text-sm text-gray-600 cursor-pointer select-none"
              >
                Remember me
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            variant="orange"
            size="lg"
            className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{showOtpField ? 'Verifying OTP...' : 'Sending OTP...'}</span>
              </div>
            ) : (
              showOtpField ? 'Verify OTP' : 'Continue'
            )}
          </Button>
        </form>

      </CardContent>
    </Card>
  );
}