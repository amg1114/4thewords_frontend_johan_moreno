import StyledButton from '@components/StyledButton';
import StyledLink from '@components/StyledLink';
import useAuth from '@hooks/useAuth';
import { DashboardProvider } from '@providers/DashboardProvider';
import { LogOutIcon } from 'lucide-react';
import { Outlet } from 'react-router';

export function DashboardLayout() {
  const { isLoading, user, logOut } = useAuth();

  if (isLoading || !user) {
    return <div className="container mx-auto px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <header className="sticky top-0 z-20 flex flex-col items-center justify-between border-b border-b-gray-300 bg-white py-4 md:flex-row">
        <span className="font-bold text-blue-500 uppercase">4TheWordsLegends</span>

        <div className="flex flex-col items-center md:items-end">
          <span className="flex items-center gap-2 text-base font-bold uppercase">
            {user.name}
            <StyledButton type="button" onClick={() => logOut()}>
              <LogOutIcon></LogOutIcon>
            </StyledButton>
          </span>
          <StyledLink href={'mailto:' + user.email}>{user.email}</StyledLink>
        </div>
      </header>

      <DashboardProvider>
        <Outlet />
      </DashboardProvider>
    </div>
  );
}
