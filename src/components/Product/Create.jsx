import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Formik } from "formik";
import { CreateProductSchema } from "@/validation";
import getApiURL from "@/helpers/getApiURL";
import fetchData from "@/helpers/fetchData";
import actionData from "@/helpers/actionData";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/slice/modalsSlice";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Input from "@/components/Input";
import Select from "@/components/Select";

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
    const body = JSON.stringify({ ...values, images: [values.images] });
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
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              type="text"
              placeholder="Title"
              value={values.title}
            />
            <small className="text-red-500 py-2">
              {errors.title && touched.title && errors.title}
            </small>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Price
            </label>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              name="price"
              type="number"
              value={values.price}
              placeholder="0"
            />
            <small className="text-red-500 py-2">
              {errors.price && touched.price && errors.price}
            </small>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              name="description"
              value={values.description}
              type="text"
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
            <small className="text-red-500 py-2">
              {errors.categoryId && touched.categoryId && errors.categoryId}
            </small>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Photo URL
            </label>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.images}
              name="images"
              type="text"
            />
            <small className="text-red-500 py-2">
              {errors.images && touched.images && errors.images}
            </small>
          </div>
          <div className="border-t pt-3 flex items-center justify-end space-x-2">
            <PrimaryButton disabled={isSubmitting} type="submit">
              {isSubmitting ? "Adding..." : "Create"}
            </PrimaryButton>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default ProductCreateForm;