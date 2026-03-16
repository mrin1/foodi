import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth.slice";
import menuReducer from "../slice/menu.slice";
import chefReducer from "../slice/chef.slice";
import blogsReducer from "../slice/blog.slice";
import orderReducer from "../slice/order.slice";
import cartReducer from "../slice/cart.slice";
import contactReducer from "../slice/contact.slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    chef: chefReducer,
    blogs: blogsReducer,
    order: orderReducer,
    cart: cartReducer,
    contact: contactReducer,
  },
});
