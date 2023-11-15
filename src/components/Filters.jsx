import { toast } from "sonner";
import { Formik } from "formik";
import { FilterSchema } from "@/validation";
import { useState, useEffect } from "react";
import getApiURL from "@/helpers/getApiURL";
import fetchData from "@/helpers/fetchData";
import {
  setPropertyFilters,
  setCurrentPage,
  deletePropertyFilters,
  clearFilters,
} from "@/store/slice/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/slice/modalsSlice";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import TextButton from "@/components/Buttons/TextButton";
import Input from "@/components/Input";
import Select from "@/components/Select";

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
            <Select
              id="filters-select"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.categoryId}
              name="categoryId"
            >
              <Select.Option value="">Select Category</Select.Option>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Price
            </label>
            <div className="flex space-x-1">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price_min}
                name="price_min"
                type="number"
                placeholder="min"
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price_max}
                name="price_max"
                type="number"
                placeholder="max"
              />
            </div>
            <small className="text-red-500 py-2">
              {errors.price_min && touched.price_min && errors.price_min}
              <br />
              {errors.price_max && touched.price_max && errors.price_max}
            </small>
          </div>
          <div className="border-t pt-3 flex items-center justify-end space-x-2">
            <TextButton type="reset" onClick={handleClearFilters}>
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
