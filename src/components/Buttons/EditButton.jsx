import React from "react";

function EditButton({ children, ...props }) {
  return (
    <button
      className="bg-yellow-600 h-[32px] w-[32px] grid place-items-center space-x-1 text-md text-white rounded hover:bg-yellow-700"
      {...props}
    >
      {children}
    </button>
  );
}

export default EditButton;
