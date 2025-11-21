import { use, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const ProductContainer = ({ productPromise }) => {
  const loadedProducts = use(productPromise);
  const [products, setProducts] = useState(loadedProducts);
  return (
    <>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-6">
        {products.map((p, index) => (
          <ProductCard
            key={p._id || index}
            p={p}
            products={products}
            setProducts={setProducts}
            myCard={true}
          />
        ))}
      </div>
      <div className="mt-10 ">
        <Link
          to={`/product/all`}
          className="rounded-md px-3.5 py-2 m-1 w-fit overflow-hidden relative group cursor-pointer border-2 font-medium flex items-center gap-2 border-indigo-600 "
        >
          See All Products{" "}
          <FaArrowRight className="animate animate-ping"></FaArrowRight>
          <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease"></span>
        </Link>
      </div>
    </>
  );
};

export default ProductContainer;
