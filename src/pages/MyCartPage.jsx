import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ProductCard from "../components/ProductCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import axios from "axios";

const MyCartPage = () => {
  const { user } = useAuth() || {};
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      axiosSecure(`http://localhost:5000/my-cart?email=${user?.email}`).then(
        ({ data }) => {
          setProducts(data);
        }
      );
    }
  }, [user, axiosSecure]);
  // console.log(products);
  const handleDelete = async (id, productId) => {
    const { data } = await axios.delete(`http://localhost:5000/my-cart/${id}`, {
      data: {
        productId,
      },
    });
    if(data.deletedCount){
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Deleted Successfully')
    }
  };

  return (
    <section className="py-12 bg-gray-300/10  px-4">
      <div className="gadgetContainer">
        <div className="text-center mb-10">
          <p className="mt-2">Browse all the products you've added</p>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {products.length > 0 ? (
          <div className="grid  sm:grid-cols-2 grid-cols-1 gap-6 transition-all">
            {products.map((p) => (
              <ProductCard
                key={p._id || p.id}
                products={p}
                setProducts={setProducts}
                myCard={true}
                p={p.productInfo}
              >
                <div>
                  <div>
                    <p>Shop: {p?.productInfo?.shopDetails?.["shop-name"]}</p>
                    <p>Owner: {p?.productInfo?.shopDetails?.ownerName}</p>
                    <p>Status: {p?.orderStatus || 'Not updated Yet'}</p>
                  </div>
                  <button
                    onClick={() =>
                      toast((t) => (
                        <div className="flex items-center gap-4 p-3 rounded-xl bg-base-200 shadow-lg border border-base-300">
                          <div className="flex flex-col">
                            <span className="text-base font-semibold text-error">
                              Are you sure?
                            </span>
                            <span className="text-sm dark:text-white opacity-70">
                              This action cannot be undone.
                            </span>
                          </div>

                          <div className="flex items-center gap-2 ml-auto">
                            {/* Delete button → triggers your custom logic */}
                            <button
                              onClick={() => {
                                handleDelete(p._id, p.productId);
                                toast.dismiss(t.id);
                              }}
                              className="btn btn-sm btn-error text-white rounded-lg"
                            >
                              Delete
                            </button>

                            {/* Dismiss button */}
                            <button
                              onClick={() => toast.dismiss(t.id)}
                              className="btn btn-sm dark:text-white btn-outline rounded-lg"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))
                    }
                    className="btn btn-error text-white mt-2 w-full rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </ProductCard>
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
