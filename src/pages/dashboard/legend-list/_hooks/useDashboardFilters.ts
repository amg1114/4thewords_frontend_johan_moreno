import { useForm } from 'react-hook-form';
import useDashboard from '@hooks/useDashboard'; // Asegúrate que este hook consuma el DashboardContext

export type DashboardFilters = {
  name?: string;
  from?: string;
  to?: string;
  province_id?: string;
  canton_id?: string;
  district_id?: string;
  category_id?: string;
};

export function useDashboardFilters() {
  const { fetchLegends } = useDashboard();

  const { register, handleSubmit } = useForm<DashboardFilters>({
    defaultValues: {
      name: '',
      from: '',
      to: '',
      province_id: '',
      canton_id: '',
      district_id: '',
      category_id: '',
    },
  });

  return {
    register,
    handleSubmit: handleSubmit(fetchLegends),
  };
}
