import { createBrowserRouter, RouterProvider } from 'react-router';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <h1 className="text-amber-300">Layout</h1>,
    },
    {},
  ]);
  return <RouterProvider router={router} />;
}

export default App;
