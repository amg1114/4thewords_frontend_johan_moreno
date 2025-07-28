import StyledLink from '@components/StyledLink';
import useAuth from '@hooks/useAuth';
import { DashboardProvider } from '@providers/DashboardProvider';
import { Outlet } from 'react-router';

export function DashboardLayout() {
  const { isLoading, user } = useAuth();

  if (isLoading || !user) {
    return <div className="container mx-auto px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-b-gray-300 bg-white py-4">
        <span className="font-bold text-blue-500 uppercase">4TheWordsLegends</span>

        <div className="flex flex-col items-end">
          <span className="text-base font-bold uppercase">{user.name}</span>
          <StyledLink href={'mailto:' + user.email}>{user.email}</StyledLink>
        </div>
      </header>

      <DashboardProvider>
        <Outlet />
      </DashboardProvider>
    </div>
  );
}
