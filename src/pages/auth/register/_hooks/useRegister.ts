import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '@hooks/useAuth';
import type { UserRegister } from '@models/user.interface';
import { userRegisterSchema } from '@utils/validators/user';
import { AxiosError } from 'axios';
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
    setError,
  } = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = async (data: UserRegister) => {
    try {
      await signUp(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Register failed:', error);

      let errorMessage = 'Error al registrarse. Intenta de nuevo.';

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.detail || errorMessage;
      }

      setError('root', {
        type: 'manual',
        message: errorMessage,
      });
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
