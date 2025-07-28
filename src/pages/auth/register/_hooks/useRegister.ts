import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '@hooks/useAuth';
import type { UserRegister } from '@models/user.interface';
import { userRegisterSchema } from '@utils/validators/user';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function useRegister() {
  const navigate = useNavigate();
  const { user, isLoading, register: signUp } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = async (data: UserRegister) => {
    try {
      await signUp(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return {
    isLoading,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    register,
  };
}
