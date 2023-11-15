function Cell({ children }) {
  return (
    <td className="px-6 py-4 text-sm font-medium text-gray-200">
      {children}
    </td>
  );
}

export default Cell;
