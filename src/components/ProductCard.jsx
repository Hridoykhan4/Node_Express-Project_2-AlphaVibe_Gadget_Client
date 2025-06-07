import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ item, products, p, myCard, setProducts }) => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const {
    _id,
    productName: name,
    brandName: brand,
    price,
    image,
    type,
    rating,
  } = p || {};

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteOk = (id) => {
    fetch(`https://alphavibe-gadgets.web.app/products/${id}`, {
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
    <div className="w-full max-w-sm mx-auto bg-white dark:bg-[#1a2641d5] rounded-xl shadow-md overflow-hidden transition hover:shadow-xl">
      <div className="relative">
        <img
          src={myCard ? p.image : image}
          alt={myCard ? p.name : name}
          className="w-full h-[300px] object-cover"
        />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-red-500 hover:text-red-600 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636 10.682 6.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="bg-white dark:bg-black rounded-lg max-w-md w-full mx-auto shadow-lg overflow-hidden">
            <div className="p-6">
              <p className="py-4 font-semibold text-black">
                Are you Sure you want to delete the Product?
              </p>
              <div className="mt-6 text-right space-x-4">
                <button
                  onClick={() => {
                    handleDeleteOk(p._id);
                    setShowModal(false);
                  }}
                  className="px-4 px-10 py-2 bg-[#FF497C] text-white rounded hover:bg-[#ab3154] transition duration-300"
                >
                  OK
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 px-10 bg-[#FF497C] text-white rounded hover:bg-[#ab3154] transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white truncate">
          {myCard ? p.name : name}
        </h2>
        <div className="flex items-center justify-between text-sm mt-1 text-gray-500 dark:text-gray-300">
          <span>Brand: {myCard ? p.brand : brand}</span>
          <span>Rating: {myCard ? p.rating : rating}⭐</span>
        </div>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Type: {myCard ? p.type : type}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-[#FF497C]">
            ${myCard ? p.price : price}
          </span>
          <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-lg">
            In Stock
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between space-x-2 text-sm">
          <button
            onClick={() => navigate(`/product/add/${_id}/update`)}
            className="flex-1 flex items-center justify-center bg-[#FF497C] hover:bg-[#ab3154] text-white px-3 py-2 rounded-md transition"
          >
            ✏️ Update
          </button>

          <button
            onClick={() => handleDelete(_id)}
            className="flex-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition"
          >
            🗑️ Delete
          </button>

          <Link
            to={`/products/${_id}`}
            className="flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            👁️ View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
