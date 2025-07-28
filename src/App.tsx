import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthLayout } from '@pages/auth/AuthLayout';
import { LoginPage } from '@pages/auth/login/LoginPage';
import AuthProvider from '@providers/AuthProvider';
import { RegisterPage } from '@pages/auth/register/RegisterPage';

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
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
