import React from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const AllUser = () => {
  const navigate = useNavigate()
  const { data: user, isLoading: userLoading } = useSelector(
    (state) => state.user
  );
  console.log(user);
  return (
    <div className="pt-14 flex flex-col gap-4">
      <div>
        <Button
          label='Add user'
          className='bg-button w-32 h-12'
          onClick={() => navigate('/adduser')}
        />
      </div>
      <div className="min-h-screen">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="border p-2 text-center">IMAGE</th>
              <th className="border p-2 text-center">NAME</th>
              <th className="border p-2 text-center">EMAIL</th>
              <th className="border p-2 text-center">POSITION</th>
              <th className="border p-2 text-center">PHONE</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr
                className={`text-gray-700 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-white"
                }`}
                key={user.id}
              >
                <td className="border p-2 text-center">
                  <img
                    src={user.imgUrl}
                    alt={user.name}
                    className="w-[150px] h-[150px] inline-block"
                  ></img>
                </td>
                <td className="border p-2 text-center">{user.name}</td>
                <td className="border p-2 text-center">{user.email}</td>
                <td className="border p-2 text-center">{user.position}</td>
                <td className="border p-2 text-center">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
