function Search({ value, handleChange }) {
  return (
    <div className="relative max-w-xs">
      <input
        onChange={handleChange}
        value={value}
        type="text"
        name="hs-table-with-pagination-search"
        id="hs-table-with-pagination-search"
        className="h-[40px] px-3 ps-9 block w-full shadow-sm rounded-lg outline-none text-sm border"
        placeholder="Search for products"
      />
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
        <svg
          className="h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
    </div>
  );
}

export default Search;
