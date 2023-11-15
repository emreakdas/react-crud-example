function Pagination({ currentPage, handleClick }) {
  return (
    <nav className="flex items-center justify-end space-x-1">
      <button
        disabled={currentPage === 1}
        onClick={() => handleClick("prev")}
        type="button"
        className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
      >
        <span>«</span>
      </button>
      <button
        onClick={() => handleClick("next")}
        type="button"
        className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
      >
        <span>»</span>
      </button>
    </nav>
  );
}

export default Pagination;