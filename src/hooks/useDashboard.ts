import { DashboardContext } from '@contexts/DashboardContext';
import { useContext } from 'react';

export default function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
