import { useState, useEffect } from "react";
import getApiURL from "@/helpers/getApiURL";
import { useDispatch, useSelector } from "react-redux";
import {
  setPropertyFilters,
  setCurrentPage,
  deletePropertyFilters,
  clearFilters,
} from "@/store/slice/productsSlice";
import { closeModal } from "@/store/slice/modalsSlice";
import fetchData from "@/helpers/fetchData";
import { toast } from "sonner";
import { Formik } from "formik";
import * as Yup from "yup";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import TextButton from "@/components/Buttons/TextButton";

const FilterSchema = Yup.object().shape({
  price_min: Yup.number()
    .min(0, "Price cannot be less than 0")
    .test(
      "price-control",
      "The price range must be entered completely.",
      function (value) {
        if (value) {
          return value && this.parent.price_max !== undefined;
        }

        return true;
      }
    ),
  price_max: Yup.number()
    .min(0, "Price cannot be less than 0")
    .test(
      "price-control",
      "The price range must be entered completely.",
      function (value) {
        if (value) {
          return value && this.parent.price_min !== undefined;
        }

        return true;
      }
    ),
});

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

  function handleSubmit(values) {
    for (const [property, value] of Object.entries(values)) {
      if (value !== "") {
        dispatch(setPropertyFilters({ property, value }));
      } else {
        if (filters.hasOwnProperty(property)) {
          dispatch(deletePropertyFilters({ property }));
        }
      }
    }
    dispatch(setCurrentPage(1));
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
    <Formik
      validationSchema={FilterSchema}
      initialValues={{
        categoryId: "",
        price_min: "",
        price_max: "",
        ...filters,
      }}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <h1 className="pb-2 mb-2 border-b text-xl">Filter</h1>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Category
            </label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.categoryId}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price_min}
                min={0}
                name="price_min"
                type="number"
                className="bg-text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="min"
              />
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price_max}
                min={1}
                name="price_max"
                type="number"
                className="bg-text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="max"
              />
            </div>
            <small className="text-red-500 py-2">
              {errors.price_min && touched.price_min && errors.price_min}
              {errors.price_max && touched.price_max && errors.price_max}
            </small>
          </div>
          <div className="border-t pt-3 flex items-center justify-end space-x-2">
            <TextButton
              type="reset"
              onClick={handleClearFilters}
            >
              Clear
            </TextButton>
            <PrimaryButton type="submit">Filter</PrimaryButton>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Filters;
