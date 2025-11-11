import { useLoaderData, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const product = useLoaderData() || {};
  const navigate = useNavigate();
  return (
    <div className="pb-10 gadgetContainer">
      <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-slate-900 dark:text-white border border-gray-200 rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl dark:text-white font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-lg font-semibold">
                Rating:
              </span>
              <span className="text-gray-800 dark:text-white font-medium">
                {product.rating}
              </span>
            </div>

            <p className="text-gray-700 dark:text-white mb-2">
              Brand: {product.brand}
            </p>
            <p className="text-gray-700 dark:text-white mb-2">
              Email: {product.email}
            </p>
            <p className="text-pink-500 font-medium mb-4">
              Type: {product.type}
            </p>

            <p className="text-2xl font-bold dark:text-white text-gray-900 mb-6">
              ${product.price}
            </p>
            <button
              className="btn btn-wide btn-secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
