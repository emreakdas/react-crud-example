function DangerButton({ children, ...props}) {
  return (
    <button
      className="bg-red-600 h-[32px] w-[32px] grid place-items-center space-x-1 text-md text-white rounded hover:bg-red-700"
      {...props}
    >
        {children}
    </button>
  );
}

export default DangerButton;
