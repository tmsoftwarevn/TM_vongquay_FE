import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Layout from "./component/layout/LayoutParent";
import ThietKe from "./page/ThietKe";


const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          {
           path:"thiet-ke",
           element: <ThietKe />
          },
          
        ],
      },

    ],
    
  );

  return <RouterProvider router={router} />;
};

export default App;
