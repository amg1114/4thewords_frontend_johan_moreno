import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import useDashboard from '@hooks/useDashboard';
import type { Legend, LegendUpdateData } from '@models/legend.interface';
import { legendUpdateSchema } from '@utils/validators/legend';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

export default function useEditLegend() {
  const { id } = useParams<{ id: string }>();
  const [currentLegend, setCurrentLegend] = useState<Legend | null>(null);
  const { updateLegend } = useDashboard();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(legendUpdateSchema),
  });

  const onSubmit = (data: LegendUpdateData) => {
    updateLegend(Number(id), data);
  };

  useEffect(() => {
    const fetchLegend = async () => {
      try {
        const response = await axios.get<Legend>(`/api/legend/${id}`);
        setCurrentLegend(response.data);
      } catch (error) {
        console.error('Error fetching legend:', error);
        throw new Response('Not Found', { status: 404 });
      }
    };

    if (id) {
      fetchLegend();
    }
  }, [id]);

  useEffect(() => {
    if (currentLegend) {
      reset({
        name: currentLegend.name,
        description: currentLegend.description,
        date: currentLegend.date,
        category_id: String(currentLegend.category.id),
        district_id: String(currentLegend.district.id),
        province_id: String(currentLegend.province.id),
        canton_id: String(currentLegend.canton.id),
      });
    }
  }, [currentLegend, reset]);

  return { handleSubmit, register, currentLegend, errors, onSubmit };
}
