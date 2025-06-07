import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const product = useLoaderData();

  return (
    <div className="pb-10 gadgetContainer">
      <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-lg font-semibold">
                Rating:
              </span>
              <span className="text-gray-800 font-medium">
                {product.rating}
              </span>
            </div>

            <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
            <p className="text-gray-700 mb-2">Email: {product.email}</p>
            <p className="text-pink-500 font-medium mb-4">
              Type: {product.type}
            </p>

            <p className="text-2xl font-bold text-gray-900 mb-6">
              ${product.price}
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 btn py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition">
                Add to Cart
              </button>

              {/*    <button className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:text-gray-900 hover:border-gray-500 transition">
                Add to Wishlist
              </button>
 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
