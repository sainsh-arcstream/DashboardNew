import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/main/Main";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
          path: "/",
          element: <Dashboard/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
