function PerPageLimit({ value, handleChange }) {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-white text-sm">Per page limit</label>
      <select
        className="text-sm rounded-lg block bg-gray-800 text-white outline-none"
        onChange={handleChange}
        value={value}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
}

export default PerPageLimit;
