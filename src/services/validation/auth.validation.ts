import * as yup from "yup";
export const authSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  fullName: yup.string().when("$isLogin", {
    is: false,
    then: (s) => s.required("Full name is required"),
    otherwise: (s) => s.optional(),
  }),
  phone: yup.string().when("$isLogin", {
    is: false,
    then: (s) => s.required("Phone is required"),
    otherwise: (s) => s.optional(),
  }),
}); 