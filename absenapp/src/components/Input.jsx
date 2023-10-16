import React from "react";

const Input = ({
  id,
  type = "text",
  placeholder,
  register,
  errors,
  disabled,
  validationSchema,
  children,
  label,
}) => {
  return (
    <div className="w-full border rounded-md py-1 pr-1">
      <p className="text-[14px] font-semibold">{label}</p>
      <div
        className={`flex flex-row justify-center items-center
        ${errors[id] ? "border-red-500" : "border-gray-300"}
      `}
      >
        {children && (
          <div
            className={`px-4  ${errors[id] ? "text-red-500" : "text-black"}`}
          >
            {children}
          </div>
        )}

        <input
          id={id}
          disabled={disabled}
          {...register(id, validationSchema)}
          placeholder={placeholder}
          type={type}
          className="w-full p-2 text-[12px] placeholder:text-gray-300 outline-none"
        />
      </div>
      <div className="text-[8px] right-0 text-red-500 text-right ">
        {errors && errors[id]?.type === "matchesPreviousPassword" && (
          <span>{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "required" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "minLength" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "pattern" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "min" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "max" && (
          <span className="error">{errors[id]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
