import React from 'react'

const Button = ({
  label,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-3xl shadow-md hover:bg-button-hover transition font-semibold border-[1px] border-[#5C8374]
        ${className}
      `}
    >
      {label}
    </button>
  )
}

export default Button