import React from "react";
import { useForm } from "react-hook-form";
import {
  MdAlternateEmail,
  MdLockOutline,
  MdPersonOutline,
} from "react-icons/md";
import { BiImageAlt } from 'react-icons/bi'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import { addAdmin } from "../../store/slice/adminSlice";
import { addUser } from "../../store/slice/userSlice";

const AddUserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(addUser(data)).then((result) => {
      if (!result.error) {
        console.log("Login SUKSES", result.payload);
        // add toast
        navigate("/users");
      } else {
        console.log("Login ERROR");
      }
    });
  };

  return (
    <div className="flex flex-row  justify-evenly bg-white px-8 py-10 rounded-lg shadow-md">
      <div className="flex flex-col justify-center items-center gap-6">
        <p className="text-[24px] font-semibold text-center">Add User</p>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="w-[400px] flex flex-col gap-y-6 items-center"
        >
          <Input
            id="imgUrl"
            placeholder="Image URL"
            register={register}
            errors={errors}
          >
            <BiImageAlt />
          </Input>
          <Input
            id="name"
            placeholder="nama"
            register={register}
            errors={errors}
            validationSchema={{
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "nama tidak sesuai format",
              },
            }}
          >
            <MdPersonOutline />
          </Input>
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
          >
            <MdAlternateEmail />
          </Input>
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
          >
            <MdLockOutline />
          </Input>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="konfirmasi password"
            register={register}
            errors={errors}
            validationSchema={{
              required: "konfirmasi password wajib diisi",
              minLength: {
                value: 6,
                message: "Please enter a minimum of 8 characters",
              },
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "password tidak sama";
                },
              },
            }}
          >
            <MdLockOutline />
          </Input>
          <Input
            id="position"
            placeholder="position"
            register={register}
            errors={errors}
            validationSchema={{
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "posisi tidak sesuai format",
              },
            }}
          >
            <MdPersonOutline />
          </Input>
          <Input
            id="phone"
            placeholder="phone number"
            register={register}
            errors={errors}
            validationSchema={{
              pattern: {
                value: /^\d+$/,
                message: "gunakan format angka",
              },
            }}
          >
            <MdPersonOutline />
          </Input>
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

export default AddUserForm;
