import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import useAxios from "../hooks/useAxios";

const AllProducts = () => {
  const loadedProducts = useLoaderData();
  const axios = useAxios();
  const [products, setProducts] = useState(loadedProducts || []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearch = (searchVal) => {
    axios(`/products?searchVal=${searchVal.trim()}`)
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="py-10 max-w-7xl mx-auto w-full px-4">
      {/* Search Box */}
      <div className="mb-8">
        <div className="relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-hover:text-primary transition-all" />

          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by title or brand..."
            className="input input-bordered w-full pl-12 py-3 rounded-2xl
                      bg-base-200 focus:ring-2 ring-primary/50 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div
        className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 
                   gap-8 transition-all"
      >
        {products.length === 0 ? (
          <div className="col-span-full flex flex-col items-center gap-3 py-20 opacity-70">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt=""
              className="w-24 opacity-70"
            />
            <p className="text-lg font-medium">No Available Products</p>
          </div>
        ) : (
          products?.map((p, index) => (
            <div
              key={p._id || index}
              className="animate-fade animate-duration-500 animate-ease-out"
            >
              <ProductCard
                p={p}
                products={products}
                setProducts={setProducts}
                myCard={true}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
