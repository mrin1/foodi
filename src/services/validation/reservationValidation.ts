import * as yup from 'yup';

export const reservationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().min(10, "Invalid phone number").required("Phone is required"),
  people: yup.number().typeError("Must be a number").min(1, "Minimum 1 person").required(),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
});