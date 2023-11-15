function PrimaryButton({ children, ...props }) {
  return (
    <button
      className="bg-blue-600 h-[40px] px-3 flex items-center space-x-1 text-md text-white rounded hover:bg-blue-700"
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
