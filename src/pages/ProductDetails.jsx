import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductDetails = () => {
  const [showOrderInfoModal, setIsShowOrderInfoModal] = useState(false);
  const { user, loading } = useAuth();
  const axios = useAxios();
  const product = useLoaderData() || {};
  const navigate = useNavigate();

  // SAFE destructuring
  const {
    _id,
    name,
    image,
    brand,
    rating,
    price,
    description,
    type,
    category,
    shopDetails = {},
  } = product;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const orderInfo = {
      customerInfo: {
        name: e.target?.name.value,
        email: e.target?.email.value,
        phoneNumber: e.target?.mobileNumber?.value,
        location: e.target?.location?.value,
      },
      productId: _id,
    };
    console.log(orderInfo);

    try {
      const { data } = await axios.post("/cart", orderInfo);
      if (data?.insertedId) {
        toast.success("Added In the Cart");
        navigate("/myCart");
      } else {
        console.log("Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pb-10 gadgetContainer">
      <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-slate-900 dark:text-white border border-gray-200 rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* IMAGE SECTION */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={image}
              alt={name}
              className="w-64 rounded-lg object-cover"
            />
          </div>

          {/* MODAL */}
          {showOrderInfoModal && (
            <dialog className="modal modal-open modal-bottom sm:modal-middle">
              <div className="modal-box">
                <form onSubmit={handleAddToCart}>
                  <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                    <legend className="fieldset-legend">
                      Customer details
                    </legend>

                    <label className="label">Name</label>
                    <input
                      name="name"
                      value={user?.displayName}
                      readOnly
                      type="text"
                      className="input w-full"
                      placeholder="Name"
                    />
                    <label className="label">Email</label>
                    <input
                      name="email"
                      value={user?.email}
                      readOnly
                      type="text"
                      className="input w-full"
                      placeholder="Email"
                    />

                    <label className="label">Mobile</label>
                    <input
                      type="tel"
                      defaultValue="+01"
                      required
                      name="mobileNumber"
                      className="input w-full"
                      placeholder="Phone Number"
                    />
                    <label className="label">location</label>
                    <input
                      type="text"
                      required
                      name="location"
                      className="input w-full"
                      placeholder="Location"
                    />
                  </fieldset>
                  <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                    <legend className="fieldset-legend">Product details</legend>

                    <label className="label">Product Name</label>
                    <input
                      value={name}
                      readOnly
                      type="text"
                      className="input w-full"
                    />
                    <label className="label">Price</label>
                    <input value={price} readOnly className="input w-full" />

                    <label className="label">Brand</label>
                    <input value={brand} readOnly className="input w-full" />
                    <label className="label">Shop</label>
                    <input
                      value={shopDetails["shop-name"]}
                      readOnly
                      className="input w-full"
                    />
                  </fieldset>

                  <input type="submit" className="w-full btn mt-3" />
                </form>

                <div className="modal-action">
                  <div method="dialog">
                    <button
                      onClick={() => setIsShowOrderInfoModal(false)}
                      className="btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          )}
          {/* MODAL */}

          {/* DETAILS SECTION */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            {/* RATING */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 font-semibold">Rating:</span>
              <span className="font-medium">{rating}</span>
            </div>
            <p className="mb-2">
              <span className="font-semibold">Brand:</span> {brand}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Category:</span> {category}
            </p>
            {/* OWNER INFO */}
            <h2 className="my-2 font-semibold text-lg">Owner Info</h2>
            {Object.entries(shopDetails).map(([key, val]) => (
              <p key={key}>
                {key}: {val}
              </p>
            ))}
            {/* TYPE */}
            {type && (
              <p className="text-pink-500 font-medium my-3">Type: {type}</p>
            )}
            <p>About: {description}</p>
            {/* PRICE */}
            <p className="text-2xl font-bold mb-6">${price}</p>
            {loading ? (
              ""
            ) : (
              <button
                disabled={user?.email === shopDetails.ownerEmail}
                onClick={() => setIsShowOrderInfoModal(true)}
                className="btn disabled:cursor-not-allowed btn-warning btn-wide"
              >
                {user?.email === shopDetails.ownerEmail
                  ? "Can not add"
                  : "Add to Cart"}
              </button>
            )}
            <br /> <br />
            {/* BACK BUTTON */}
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
