import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { z } from 'zod';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { userSignInSchema, userSignInType } from '@schemas/userSchema';
import { useAuthActions } from '@hooks/useAuthActions';
import { useAuthUser } from '@hooks/useAuthUser';
import toast from 'react-hot-toast';
import { UserRole } from '@enums/UserRole';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signOut } = useAuthActions();
  const { role } = useAuthUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Validate login data
      const validatedData: userSignInType = userSignInSchema.parse({ email, password });

      // Sign in user
      await signIn(validatedData);

    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errorMap[err.path[0]] = err.message;
          }
        });
        setErrors(errorMap);
      } else if (error instanceof Error) {
        setErrors({
          password: error.message || 'Login failed. Please try again.',
        });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === null) {
      return;
    }
    if (role !== UserRole.UNASSIGNED) {
      navigate('/' + role);
      toast.success('Successfully logged in!',
        {
          style: {
              background: "white",
              color: "black",
          },
          iconTheme: {
              primary: "black",
              secondary: "white",
          },
      });
    }
    if (role === UserRole.UNASSIGNED) {
      signOut();
      navigate('/');
      toast.error('Please wait for admin approval to log in!',
        {
          style: {
              background: "white",
              color: "black",
          },
          iconTheme: {
              primary: "black",
              secondary: "white",
          },
      });
    }
  }, [role, navigate, signOut]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center">
          <img 
            src="/src/assets/logo-nobg-white.png" 
            alt="Logo" 
            className="h-36 w-36 mb-2"
          />
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
