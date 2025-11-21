import { Suspense } from "react";
import Spinner from "../components/Spinner";
import MyProducts from "../components/MyProducts";
import useAuth from "../hooks/useAuth";
import usePostedProducts from "../hooks/usePostedProducts";

const MyPostedProducts = () => {
  const { user } = useAuth();
  const { loading, products } = usePostedProducts(user?.email);

  if (loading) return <Spinner></Spinner>;

  return (
    <div>
      <Suspense fallback={<Spinner></Spinner>}>
        <MyProducts fetchedPostedProducts={products}></MyProducts>
      </Suspense>
    </div>
  );
};

export default MyPostedProducts;
