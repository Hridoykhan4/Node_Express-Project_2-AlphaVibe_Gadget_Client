import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductCard = ({ p, myCard, children }) => {
  console.log(p);
  const { _id, name, brand, price, image, rating } = p || {};

  return (
    <div className="w-full max-w-sm mx-auto p-3 bg-white dark:bg-[#1a2641d5] rounded-xl shadow-md overflow-hidden transition hover:shadow-xl">
      <div className="relative">
        <img
          src={myCard ? p.image : image}
          alt={myCard ? p.name : name}
          className="w-48  object-cover"
        />
        <button className="absolute top-3 right-5 bg-white p-2 rounded-full shadow text-red-500 hover:text-red-600 transition">
          <FaHeart className="text-xl font-semibold"></FaHeart>
        </button>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white truncate">
          {myCard ? p.name : name}
        </h2>
        <div className="flex items-center justify-between text-sm mt-1 text-gray-500 dark:text-gray-300">
          <span>Brand: {myCard ? p.brand : brand}</span>
          <span>Rating: {myCard ? p.rating : rating}⭐</span>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-[#FF497C]">
            ${myCard ? p.price : price}
          </span>
          <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-lg">
            In Stock
          </span>
        </div>

        {!children && (
          <Link
            to={`/products/${_id}`}
            className="btn-success btn btn-sm mt-2  text-white"
          >
            See Details
          </Link>
        )}

        {children}
      </div>
    </div>
  );
};

export default ProductCard;
