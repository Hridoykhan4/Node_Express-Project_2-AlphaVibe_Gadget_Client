import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ProductCard from "../components/ProductCard";

const MyCartPage = () => {
  const { user } = useAuth() || {};
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`https://alpha-vibe-server.vercel.app/myProducts/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    }
  }, [user]);

  return (
    <section className="py-12  bg-gray-300/10  ">
      <div className="gadgetContainer">
        <div className="text-center mb-10">
          <p className="mt-2">Browse all the products you've added</p>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {products.length > 0 ? (
          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 transition-all">
            {products.map((p) => (
              <ProductCard
                key={p._id || p.id}
                products={products}
                setProducts={setProducts}
                myCard={true}
                p={p}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20">
            <svg
              className="w-16 h-16 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68l3.24-7.56M7 13V6h10v7"
              />
            </svg>
            <p className="text-lg font-medium">You have no products yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Start shopping and add items to your cart!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCartPage;
