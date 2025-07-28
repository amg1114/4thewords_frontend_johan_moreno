import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthLayout } from '@pages/auth/AuthLayout';
import { LoginPage } from '@pages/auth/login/LoginPage';
import AuthProvider from '@providers/AuthProvider';
import { RegisterPage } from '@pages/auth/register/RegisterPage';
import { DashboardLayout } from '@pages/dashboard/DashboardLayout';
import { LegendList } from '@pages/dashboard/legend-list/LegendList';
import CreateLegend from '@pages/dashboard/create/CreateLegend';
import EditLegend from '@pages/dashboard/edit/EditLegend';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          index: true,
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'legends',
          index: true,
          element: <LegendList />,
        },
        {
          path: 'legends/create',
          element: <CreateLegend />,
        },
        {
          path: 'legends/edit/:id',
          element: <EditLegend />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
