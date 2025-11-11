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
            return fetch(
              `https://alpha-vibe-server.vercel.app/productDetail/${params?.id}`
            );
          }
        },
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
          fetch(
            `https://alpha-vibe-server.vercel.app/productDetail/${params?.id}`
          ),
        hydrateFallbackElement: <p>Loading ... </p>,
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            <Users></Users>
          </PrivateRoute>
        ),
        loader: () => fetch("https://alpha-vibe-server.vercel.app/users") || [],
      },
      {
        path: "/userUpdate/:id",
        element: (
          <PrivateRoute>
            <UserUpdatePage></UserUpdatePage>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://alpha-vibe-server.vercel.app/updateUser/${params.id}`),
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
