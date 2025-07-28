import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { AuthLayout } from '@pages/auth/AuthLayout';
import { LoginPage } from '@pages/auth/login/LoginPage';
import AuthProvider from '@providers/AuthProvider';
import { RegisterPage } from '@pages/auth/register/RegisterPage';
import { DashboardLayout } from '@pages/dashboard/DashboardLayout';
import { LegendList } from '@pages/dashboard/legend-list/LegendList';
import CreateLegend from '@pages/dashboard/create/CreateLegend';
import EditLegend from '@pages/dashboard/edit/EditLegend';
import { ProtectedRoute } from '@pages/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/login" replace />,
        },
        {
          path: 'login',
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
      element: <ProtectedRoute />,
      children: [
        {
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="/dashboard/legends" replace />,
            },
            {
              path: 'legends',
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
