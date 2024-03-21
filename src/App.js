import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Layout from "./component/layout/LayoutParent";
import ThietKe from "./page/ThietKe";
import PhanThuong from "./page/PhanThuong";
import BaoCao from "./page/BaoCao";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "thiet-ke",
          element: <ThietKe />,
        },
        {
          path: "phan-thuong",
          element: <PhanThuong />,
        },
        {
          path: "bao-cao",
          element: <BaoCao />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
