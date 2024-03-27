import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layoutadmin from "./component/layout/LayoutAdmin";
import ThietKe from "./page admin/ThietKe";
import PhanThuong from "./page admin/PhanThuong";
import BaoCao from "./page admin/BaoCao";
import ThietLapChung from "./page admin/ThietLapChung";
import LayoutHome from "./component/layout/LayoutHome";
import Game from "./page home/Game";
import TaiKhoan from "./page home/TaiKhoan";
import ChangePass from "./page home/ChangePass";
import Login from "./component/account/Login";
import Register from "./component/account/Register";
import QuenMatkhau from "./component/account/QuenMatKhau";

import Notfound from "./component/layout/Notfound";

const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutHome />,
      children: [
        { index: true, element: <Game /> },
        {
          path: "game",
          element: <Game />,
        },
        {
          path: "tai-khoan",
          element: <TaiKhoan />,
        },
        {
          path: "password",
          element: <ChangePass />,
        },
      ],
    },
    {
      path: "/admin",
      element: <Layoutadmin /> ,
      children: [
        { index: true, element: <ThietLapChung /> },
        {
          path: "thiet-lap-chung/:id",
          element: <ThietLapChung />,
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
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dang-ki",
      element: <Register />,
    },
    {
      path: "/quen-mat-khau",
      element: <QuenMatkhau />,
    },
    {
      errorElement: <Notfound />,
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
