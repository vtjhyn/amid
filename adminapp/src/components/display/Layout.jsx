import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Container from "./Container";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  setProfileDataFromLocalStorage,
} from "../../store/slice/userSlice";
import { sessionGet } from "../../utils/session";
import {
  getAllAbsen,
  setAbsenDataFromLocalStorage,
} from "../../store/slice/absenSlice";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    if (!sessionGet("token")) {
      console.log("SESI BERAKHIR");
      navigate("/login", {
        replace: true,
      });
    }
    if (!localStorage.getItem("user")) {
      dispatch(getUser());
    } else {
      dispatch(setProfileDataFromLocalStorage());
    }

    if (!localStorage.getItem("absen")) {
      dispatch(getAllAbsen());
    } else {
      dispatch(setAbsenDataFromLocalStorage());
    }
  }, [sessionGet("token")]);
  return (
    <div className="h-full bg-slate-200">
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
