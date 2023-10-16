import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Container from "./Container";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  setProfileDataFromLocalStorage,
} from "../../store/slice/userSlice";
import { sessionGet } from "../../utils/session";
import {
  getAbsenList,
  setAbsenDataFromLocalStorage,
} from "../../store/slice/absenSlice";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: user, isLoading: userLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!sessionGet("token")) {
      console.log("SESI BERAKHIR");
      navigate("/login", {
        replace: true,
      });
    }
    if (!localStorage.getItem("user")) {
      dispatch(getUserData());
    } else {
      dispatch(setProfileDataFromLocalStorage());
    }

    if (!localStorage.getItem("absen")) {
      dispatch(getAbsenList(user.id));
    } else {
      dispatch(setAbsenDataFromLocalStorage());
    }
  }, [sessionGet("token")]);
  return (
    <div className="bg-slate-200">
      <Navbar />
      <Container>
        <Outlet user={user} />
      </Container>
    </div>
  );
};

export default Layout;
