import { SearchIcon } from "@/components/Icons";

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
        <SearchIcon />
      </div>
    </div>
  );
}

export default Search;
