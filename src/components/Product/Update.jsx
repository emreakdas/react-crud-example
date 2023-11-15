import { useState, useEffect } from "react";
import { Formik } from "formik";
import { toast } from "sonner";
import getApiURL from "@/helpers/getApiURL";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/slice/modalsSlice";
import { UpdateProductSchema } from "@/validation";
import fetchData from "@/helpers/fetchData";
import actionData from "@/helpers/actionData";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Input from "@/components/Input";

function ProductUpdateForm({ productId }) {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = getApiURL(`products/${productId}`);
    fetchData(
      url,
      (json) => {
        setProduct({
          title: json.title,
          price: json.price,
          description: json.description,
          images: json.images[0],
        });
      },
      () => {
        toast.error("Product Please try again later.");
        dispatch(closeModal());
      }
    );
  }, []);

  function handleSubmit(values, { setSubmitting }) {
    toast.info("Product is updating...");
    const url = getApiURL(`products/${productId}`);
    const body = JSON.stringify({ ...values, images: [values.images] });
    actionData(
      url,
      "PUT",
      body,
      () => {
        toast.success("Product Update");
        dispatch(closeModal());
      },
      () => {
        toast.error(
          "The product could not be updated, please try again later."
        );
      },
      () => {
        setSubmitting(false);
      }
    );
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Formik
      initialValues={{ ...product }}
      validationSchema={UpdateProductSchema}
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
          <h1 className="pb-2 mb-2 border-b text-xl">{product.title}</h1>
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
              {isSubmitting ? "Updating..." : "Update"}
            </PrimaryButton>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default ProductUpdateForm;
