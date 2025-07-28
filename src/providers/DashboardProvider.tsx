import { DashboardContext } from '@contexts/DashboardContext';
import useAuth from '@hooks/useAuth';
import type { Category } from '@models/category.interface';
import type { Legend } from '@models/legend.interface';
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

  const filterLegends = async (filters: DashboardFilters) => {
    let url = '/api/legend';
    const params: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params[key] = value;
      }
    });

    if (Object.keys(params).length > 0) {
      url += '?' + new URLSearchParams(params).toString();
    }

    try {
      const res = await axios.get<Legend[]>(url);
      setLegends(res.data);
    } catch (error) {
      setLegends([]);
      console.error('Error fetching legends:', error);
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
        const [legendsRes, provincesRes, cantonsRes, districtsRes] = await Promise.all([
          axios.get<Legend[]>('/api/legend'),
          axios.get<Province[]>('/api/location/provinces'),
          axios.get<Canton[]>('/api/location/cantons'),
          axios.get<District[]>('/api/location/districts'),
        ]);

        setLegends(legendsRes.data);
        setData({
          // legends: legendsRes.data,
          provinces: provincesRes.data,
          cantons: cantonsRes.data,
          districts: districtsRes.data,
          categories: [],
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
    <DashboardContext.Provider value={{ data, legends, fetchLegends: filterLegends }}>
      {children}
    </DashboardContext.Provider>
  );
}
