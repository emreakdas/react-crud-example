function TextButton({ children, ...props }) {
  return (
    <button className="text-gray-800" {...props}>
      {children}
    </button>
  );
}

export default TextButton;
