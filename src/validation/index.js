import * as Yup from "yup";

export const FilterSchema = Yup.object().shape({
  price_min: Yup.number()
    .min(0, "Price cannot be less than 0")
    .test(
      "price-control",
      "The price range must be entered completely.",
      function (value) {
        if (!isNaN(value)) {
          return this.parent.price_max !== undefined;
        }

        return true;
      }
    ),
  price_max: Yup.number()
    .min(1, "Price cannot be less than 1")
    .test(
      "price-control",
      "The price range must be entered completely.",
      function (value) {
        if (!isNaN(value)) {
          return this.parent.price_min !== undefined;
        }

        return true;
      }
    ),
});

export const CreateProductSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too Short!").required("Required"),
  description: Yup.string().min(3, "Too Short!").required("Required"),
  price: Yup.number()
    .min(0, "Price cannot be less than 0")
    .required("Required"),
  images: Yup.string().url("Enter valid photo url.").required("Required"),
  categoryId: Yup.string().required("Required"),
});

export const UpdateProductSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too Short!").required("Required"),
  description: Yup.string().min(3, "Too Short!").required("Required"),
  price: Yup.number()
    .min(0, "Price cannot be less than 0")
    .required("Required"),
  images: Yup.string().url("Enter valid photo url.").required("Required"),
});
