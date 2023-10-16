import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { data: user, isLoading: userLoading } = useSelector(
    (state) => state.user
  );
  return (
    <div className="flex flex-col gap-4 bg-white items-center px-4 py-6 shadow-md rounded">
      <img src={user.imgUrl} alt={user.name} height={150} width={150} />
      <div>
        <p>Nama : {user.name}</p>
        <p>Email : {user.email}</p>
        <p>Posisi : {user.position}</p>
        <p>Nomor Handphone : {user.phone}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
