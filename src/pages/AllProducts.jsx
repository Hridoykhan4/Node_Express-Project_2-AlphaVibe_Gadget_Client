import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const loadedProducts = useLoaderData();
  const [products, setProducts] = useState(loadedProducts || []);
  return (
    <div className="py-10">
      <div className="grid xl:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-6">
        {products?.map((p, index) => (
          <ProductCard
            key={p._id || index}
            p={p}
            products={products}
            setProducts={setProducts}
            myCard={true}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
