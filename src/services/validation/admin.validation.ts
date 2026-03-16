import * as yup from "yup";

export const menuSchema = yup.object({
  title: yup.string().required("Dish name is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().optional(),
  price: yup.number().typeError("Price must be a number").required("Price is required"),
});

export const chefSchema = yup.object({
  title: yup.string().required("Chef name is required"),
  description: yup.string().required("Bio is required"),
  image: yup.string().required("Photo is required"),
  price: yup.string().required("Designation is required"),
});

export const blogSchema = yup.object({
  title: yup.string().required("Blog title is required"),
  description: yup.string().required("Blog content is required"),
  image: yup.string().required("Cover image is required"),
  price: yup.string().notRequired(), 
});