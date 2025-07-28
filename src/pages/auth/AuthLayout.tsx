import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex w-full max-w-md flex-col justify-center p-6">
        <Outlet />
      </div>
      <figure className="flex-fill relative">
        <img src="auth-background.jpg" alt="Library Image" className="object-cover" />
      </figure>
    </div>
  );
}
