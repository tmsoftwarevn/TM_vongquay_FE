import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Layout from "./component/layout/LayoutParent";
import ThietKe from "./page/ThietKe";
import PhanThuong from "./page/PhanThuong";
import BaoCao from "./page/BaoCao";
import ThietLapChung from "./page/ThietLapChung";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "thiet-lap-chung/:id",
          element: <ThietLapChung />
        },
        {
          path: "thiet-ke/:id",
          element: <ThietKe />,
        },
        {
          path: "phan-thuong/:id",
          element: <PhanThuong />,
        },
        {
          path: "bao-cao/:id",
          element: <BaoCao />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
