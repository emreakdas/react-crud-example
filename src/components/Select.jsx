function Select({ children, ...props }) {
  return (
    <select
      className="border text-sm rounded-lg appearance-none block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
      {...props}
    >
      {children}
    </select>
  );
}

function Option({ children, ...props }) {
  return <option {...props}>{children}</option>;
}

Select.Option = Option;

export default Select;