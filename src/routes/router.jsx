import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import HomePage from "../pages/HomePage";
import AddProductPage from "../pages/AddProductPage";
import MyCartPage from "../pages/MyCartPage";
import ProductDetails from "../pages/ProductDetails";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Users";
import UserUpdatePage from "../pages/UserUpdatePage";
import AllProducts from "../pages/AllProducts";
import axios from "axios";
import Spinner from "../components/Spinner";
import MyPostedProducts from "../pages/MyPostedProducts";
import ViewCustomerOrders from "../pages/ViewCustomerOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/product/add/:id?/:update?",
        element: (
          <PrivateRoute>
            <AddProductPage></AddProductPage>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          if (params.id) {
            return fetch(`http://localhost:5000/productDetail/${params?.id}`);
          }
        },
        hydrateFallbackElement: <Spinner></Spinner>,
      },
      {
        path: "/product/all",
        element: <AllProducts></AllProducts>,
        loader: async () => {
          try {
            const { data } = await axios("http://localhost:5000/products");
            return data;
          } catch (err) {
            console.log(err);
          }
        },
        hydrateFallbackElement: <Spinner></Spinner>,
      },
      {
        path: "/product/add",
        element: (
          <PrivateRoute>
            <AddProductPage></AddProductPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/myCart",
        element: (
          <PrivateRoute>
            <MyCartPage></MyCartPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/products/:id",
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/productDetail/${params?.id}`),
        hydrateFallbackElement: <Spinner></Spinner>,
      },
      {
        path: "/orders/customers/:id",
        element: <PrivateRoute><ViewCustomerOrders></ViewCustomerOrders></PrivateRoute>,
      },

      {
        path: "/users",
        element: (
          <PrivateRoute>
            <Users></Users>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:5000/users") || [],
      },
      {
        path: "/userUpdate/:id",
        element: (
          <PrivateRoute>
            <UserUpdatePage></UserUpdatePage>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/updateUser/${params.id}`),
        hydrateFallbackElement: <Spinner></Spinner>,
      },

      {
        path: "/products/me",
        element: <MyPostedProducts></MyPostedProducts>,
      },
    ],
  },
  {
    path: "/signIn",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signUp",
    element: <RegisterPage></RegisterPage>,
  },
]);

export default router;
