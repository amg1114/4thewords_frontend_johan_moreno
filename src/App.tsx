import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthLayout } from '@pages/auth/AuthLayout';
import { LoginPage } from '@pages/auth/login/LoginPage';
import AuthProvider from '@providers/AuthProvider';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <LoginPage />,
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
