import React from "react";
import { useForm } from "react-hook-form";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import { authLogin } from "../../store/slice/authSlice";

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(authLogin(data)).then((result) => {
      if (!result.error) {
        console.log("Login SUKSES", result.payload);
        // add toast
        navigate("/");
      } else {
        console.log("Login ERROR");
      }
    });
  };

  return (
    <div className="flex flex-row  justify-evenly bg-white px-8 py-10 rounded-lg shadow-md">
      <div className="flex flex-col justify-center items-center gap-6">
        <p className="text-[24px] font-semibold text-center">Edit Profile</p>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="w-[400px] flex flex-col gap-y-6 items-center"
        >
          <Input
            id="email"
            placeholder="masukkan email"
            register={register}
            errors={errors}
            validationSchema={{
              required: "email wajib diisi",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "email tidak sesuai format",
              },
            }}
          />
          <Input
            id="password"
            type="password"
            placeholder="masukkan password"
            register={register}
            errors={errors}
            validationSchema={{
              required: "password wajib diisi",
              minLength: {
                value: 6,
                message: "Please enter a minimum of 8 characters",
              },
            }}
          />
          <Button
            label="Save"
            onClick={() => {}}
            className="bg-button py-2 mt-4 w-[150px] flex justify-center"
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
