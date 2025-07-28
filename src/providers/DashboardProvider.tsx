import { DashboardContext } from '@contexts/DashboardContext';
import useAuth from '@hooks/useAuth';
import type { Category } from '@models/category.interface';
import type { Legend, LegendCreateData, LegendUpdateData } from '@models/legend.interface';
import type { Province, Canton, District } from '@models/location.interface';
import type { DashboardFilters } from '@pages/dashboard/legend-list/_hooks/useDashboardFilters';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export type DashboardData = {
  provinces: Province[];
  cantons: Canton[];
  districts: District[];
  categories: Category[];
  isLoading?: boolean;
};

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [legends, setLegends] = useState<Legend[]>([]);
  const [data, setData] = useState<DashboardData>({
    provinces: [],
    cantons: [],
    districts: [],
    categories: [],
    isLoading: false,
  });
  const [legendToDelete, setLegendToDelete] = useState<number | null>(null);
  const fetchLegends = async (filters?: DashboardFilters) => {
    let url = '/api/legend';
    if (filters) {
      const params: Record<string, string> = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params[key] = value;
        }
      });

      if (Object.keys(params).length > 0) {
        url += '?' + new URLSearchParams(params).toString();
      }
    }

    try {
      const res = await axios.get<Legend[]>(url);
      setLegends(res.data);
    } catch (error) {
      setLegends([]);
      console.error('Error fetching legends:', error);
    }
  };

  const createLegend = async (legendData: LegendCreateData) => {
    try {
      const formData = new FormData();
      Object.entries(legendData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      await axios.post<Legend>('/api/legend', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await fetchLegends();
      navigate('/dashboard/legends');
    } catch (error) {
      console.error('Error creating legend:', error);
    }
  };

  const updateLegend = async (id: number, legendData: LegendUpdateData) => {
    try {
      const formData = new FormData();
      Object.entries(legendData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });

      await axios.patch<Legend>(`/api/legend/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await fetchLegends();
      navigate('/dashboard/legends');
    } catch (error) {
      console.error('Error updating legend:', error);
    }
  };

  const deleteLegend = async (id: number) => {
    setLegendToDelete(id);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`/api/legend/${legendToDelete}`);
      await fetchLegends();
      setLegendToDelete(null);
    } catch (error) {
      console.error('Error deleting legend:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      setData({
        provinces: [],
        cantons: [],
        districts: [],
        categories: [],
      });
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    async function fetchData() {
      setData((prevData: DashboardData) => ({ ...prevData, isLoading: true }));

      try {
        const [legendsRes, categoriesRes, provincesRes, cantonsRes, districtsRes] = await Promise.all([
          axios.get<Legend[]>('/api/legend'),
          axios.get<Legend[]>('/api/legend/categories'),
          axios.get<Province[]>('/api/location/provinces'),
          axios.get<Canton[]>('/api/location/cantons'),
          axios.get<District[]>('/api/location/districts'),
        ]);

        setLegends(legendsRes.data);
        setData({
          provinces: provincesRes.data,
          cantons: cantonsRes.data,
          districts: districtsRes.data,
          categories: categoriesRes.data,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setData((prevData: DashboardData) => ({ ...prevData, isLoading: false }));
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ data, legends, fetchLegends, createLegend, updateLegend, deleteLegend }}>
      {legendToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="rounded-lg bg-white p-6">
            <h2>Are you sure?</h2>
            <p>This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="rounded bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                onClick={() => setLegendToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                onClick={() => handleDeleteConfirmation()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </DashboardContext.Provider>
  );
}
