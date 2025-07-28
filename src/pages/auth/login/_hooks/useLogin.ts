import useAuth from '@hooks/useAuth';
import type { UserLogin } from '@models/user.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema } from '@utils/validators/user';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

export default function useLogin() {
  const navigate = useNavigate();
  const { user, logIn, isLoading } = useAuth();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
  });

  useEffect(() => {
    if (user) {
      navigate('/dashboard/legends');
    }
  }, [user, navigate]);

  const onSubmit = async (data: UserLogin) => {
    try {
      await logIn(data);
      navigate('/dashboard/legends');
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión. Intenta de nuevo.';

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.detail || errorMessage;
      }

      setError('root', {
        type: 'manual',
        message: errorMessage,
      });
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
