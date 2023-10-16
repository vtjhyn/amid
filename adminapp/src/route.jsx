import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/display/Layout";
import Home from "./pages/Home";
import AbsenList from './pages/AbsenList'
import Register from "./pages/Register";
import AllUser from "./pages/AllUsers";
import AddUser from "./pages/AddUser";


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
        path: "/users",
        element: <AllUser />,
      },
      {
        path: "/adduser",
        element: <AddUser />,
      },
      {
        path: "/absen",
        element: <AbsenList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <div>NOT FOUND</div>,
  },
]);

export default router;
