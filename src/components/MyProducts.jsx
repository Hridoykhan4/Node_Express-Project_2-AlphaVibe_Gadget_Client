import { useState } from "react";
import ProductCard from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyProducts = ({ fetchedPostedProducts }) => {
  const [products, setProducts] = useState(fetchedPostedProducts);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  console.log(products);
  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteOk = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted Successfully", {
            position: "top right",
          });
          const remaining = products?.filter((product) => product?._id !== id);
          setProducts(remaining);
        }
      });
  };

  return (
    <div className="my-4">
      <h3 className="text-center mb-5 text-xl  underline font-semibold">
        My Products
      </h3>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-6">
        {products.map((p, index) => (
          <ProductCard
            key={p._id || index}
            p={p}
            products={products}
            // setProducts={setProducts}
            myCard={true}
          >
            {/* Action Buttons */}
            <>
              <div>
                <h2 className="font-semibold ">
                  Total Orders: ({p?.productCount})
                </h2>
                <Link
                  className="link link-error text-lg tracking-wide leading-relaxed"
                  to={`/orders/customers/${p._id}`}
                >
                  View Customers
                </Link>
              </div>
              <div className="mt-4 flex justify-between space-x-2 text-sm">
                <button
                  onClick={() => navigate(`/product/add/${p._id}/update`)}
                  className="flex-1 flex items-center justify-center bg-[#FF497C] hover:bg-[#ab3154] text-white px-3 py-2 rounded-md transition"
                >
                  ✏️ Update
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition"
                >
                  🗑️ Delete
                </button>

                <Link
                  to={`/products/${p._id}`}
                  className="flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  👁️ View
                </Link>
              </div>
            </>

            {showModal && (
              <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center  px-4 py-8">
                <div className="bg-white dark:bg-gray-600 rounded-lg max-w-md w-full mx-auto shadow-lg overflow-hidden">
                  <div className="p-6">
                    <p className="py-4 dark:text-white font-semibold text-black">
                      Are you Sure you want to delete the {p.name} ?
                    </p>
                    <div className="mt-6 text-right space-x-4">
                      <button
                        onClick={() => {
                          handleDeleteOk(p._id);
                          setShowModal(false);
                        }}
                        className="px-4 sm:px-10 py-2 bg-[#FF497C] text-white rounded hover:bg-[#ab3154] transition duration-300"
                      >
                        OK
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 sm:px-10 bg-[#FF497C] text-white rounded hover:bg-[#ab3154] transition duration-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
