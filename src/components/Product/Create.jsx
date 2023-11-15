import { useState, useEffect } from "react";
import getApiURL from "@/helpers/getApiURL";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/slice/modalsSlice";
import fetchData from "@/helpers/fetchData";
import { toast } from "sonner";
import actionData from "@/helpers/actionData";
import { Formik } from "formik";
import * as Yup from 'yup';


const CreateProductSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Too Short!').required('Required'),
  description: Yup.string().min(3, 'Too Short!').required('Required'),
  price: Yup.number().min(0, 'Price cannot be less than 0').required('Required'),
  images: Yup.string().url("Enter valid photo url.").required('Required'),
  categoryId: Yup.string().required('Required'),
});

function ProductCreateForm() {
  const [categories, setCategories] = useState(null);
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

  function handleSubmit(values, { setSubmitting }) {
    toast.info("Product is adding...");
    const url = getApiURL("products");
    const body = JSON.stringify({...values, images:[values.images]});
    actionData(
      url,
      "POST",
      body,
      () => {
        toast.success("Product Created");
        dispatch(closeModal());
      },
      () => {
        toast.error(
          "The product could not be created, please try again later."
        );
      },
      () => {
        setSubmitting(false);
      }
    );
  }

  if (!categories) {
    return <p>Loading...</p>;
  }

  return (
    <Formik
      initialValues={{
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: "",
      }}
      validationSchema={CreateProductSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <h1 className="pb-2 mb-2 border-b text-xl">Create Product</h1>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Title
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              type="text"
              className="bg-text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="Title"
              value={values.title}
            />
            <small className="text-red-500 py-2">{errors.title && touched.title && errors.title}</small>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="price"
              type="number"
              value={values.price}
              className="bg-text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="0"
            />
            <small className="text-red-500 py-2">{errors.price && touched.price && errors.price}</small>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="description"
              value={values.description}
              type="text"
              className="bg-text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="Description"
            />
            <small className="text-red-500 py-2">
              {errors.description && touched.description && errors.description}
            </small>
          </div>
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
            <small className="text-red-500 py-2">
              {errors.categoryId && touched.categoryId && errors.categoryId}
            </small>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Photo URL
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.images}
              name="images"
              type="text"
              className="bg-text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            />
            <small className="text-red-500 py-2">{errors.images && touched.images && errors.images}</small>
          </div>
          <div className="border-t pt-3 flex items-center justify-end space-x-2">
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-blue-600 h-[40px] px-3 text-md text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Create"}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default ProductCreateForm;
