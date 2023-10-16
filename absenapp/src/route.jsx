import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/display/Layout";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Absen from './pages/Absen'
import AbsenList from './pages/AbsenList'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/absen",
        element: <Absen />,
      },
      {
        path: "/summary",
        element: <AbsenList />,
      },
      {
        path: "/editprofile",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>NOT FOUND</div>,
  },
]);

export default router;
