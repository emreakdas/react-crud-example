import { useState, useEffect } from "react";
import getApiURL from "@/helpers/getApiURL";
import { useDispatch, useSelector } from "react-redux";
import {
  setPropertyFilters,
  deletePropertyFilters,
  clearFilters,
} from "@/store/slice/productsSlice";
import { closeModal } from "@/store/slice/modalsSlice";
import fetchData from "@/helpers/fetchData";
import { toast } from "sonner";

function Filters() {
  const [categories, setCategories] = useState(null);
  const filters = useSelector((state) => state.products.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = getApiURL("categories");
    fetchData(
      url,
      (json) => setCategories(json),
      () => {
        toast.error("Categories could not be loaded. Please try again later.");
        dispatch(closeModal());
      }
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    for (const [property, value] of formData.entries()) {
      if (value !== "") {
        dispatch(setPropertyFilters({ property, value }));
      } else {
        if (filters.hasOwnProperty(property)) {
          dispatch(deletePropertyFilters({ property }));
        }
      }
    }
    dispatch(closeModal());
  }

  function handleClearFilters() {
    dispatch(clearFilters());
    dispatch(closeModal());
  }

  if (!categories) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Category
        </label>
        <select
          defaultValue={filters.categoryId}
          name="categoryId"
          className="filters-select border text-sm rounded-lg appearance-none block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Price
        </label>
        <div className="flex space-x-1">
          <input
            defaultValue={filters.price_min}
            min={0}
            name="price_min"
            type="number"
            className="bg-text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="min"
          />
          <input
            defaultValue={filters.price_max}
            min={1}
            name="price_max"
            type="number"
            className="bg-text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="max"
          />
        </div>
      </div>
      <div className="border-t pt-3 flex items-center justify-end space-x-2">
        <button
          type="reset"
          className="text-gray-800"
          onClick={handleClearFilters}
        >
          Clear
        </button>
        <button
          type="submit"
          className="bg-blue-600 h-[40px] px-3 text-md text-white rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </div>
    </form>
  );
}

export default Filters;
