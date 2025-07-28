import useAuth from '@hooks/useAuth';
import type { UserLogin } from '@models/user.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema } from '@utils/validators/user';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function useLogin() {
  const navigate = useNavigate();
  const { user, logIn, isLoading } = useAuth();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
  });

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onSubmit = async (data: UserLogin) => {
    try {
      await logIn(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return {
    isLoading,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    register,
  };
}
