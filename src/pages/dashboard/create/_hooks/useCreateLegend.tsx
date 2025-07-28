import { zodResolver } from '@hookform/resolvers/zod';
import useDashboard from '@hooks/useDashboard';
import type { LegendCreateData } from '@models/legend.interface';
import { legendCreateSchema } from '@utils/validators/legend';
import { useForm } from 'react-hook-form';

export function useCreateLegend() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(legendCreateSchema),
  });

  const { createLegend } = useDashboard();

  const onSubmit = (data: LegendCreateData) => {
    createLegend(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
}
