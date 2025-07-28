import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      {/* Imagen pequeña decorativa en móviles */}
      <figure className="relative block h-32 w-full md:hidden">
        <img src="auth-background.jpg" alt="Library Image" className="h-full w-full object-cover" />
      </figure>

      {/* Panel del formulario */}
      <div className="flex w-full flex-col justify-center p-6 md:max-w-md">
        <Outlet />
      </div>

      {/* Imagen completa en pantallas grandes */}
      <figure className="relative hidden flex-1 md:flex">
        <img src="auth-background.jpg" alt="Library Image" className="h-full w-full object-cover" />
      </figure>
    </div>
  );
}
