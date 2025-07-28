import type { Legend } from '@models/legend.interface';
import type { DashboardFilters } from '@pages/dashboard/legend-list/_hooks/useDashboardFilters';
import type { DashboardData } from '@providers/DashboardProvider';
import { createContext } from 'react';

export type DashboardContextType = {
  data: DashboardData;
  legends: Legend[];
  fetchLegends: (filters: DashboardFilters) => Promise<void>;
};
export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);
