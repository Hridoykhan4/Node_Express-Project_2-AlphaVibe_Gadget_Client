import { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const AddProductPage = () => {
  const { user } = useAuth() || {};
  const axios = useAxios();
  // console.log(user);
  const nav = useNavigate();
  const data = useLoaderData() || {};

  const [editProduct] = useState(data);

  const { update } = useParams();

  const [selectedBrand, setSelectedBrand] = useState(editProduct?.brand);

  const handleChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const {
      price,
      ownerName,
      ownerEmail,
      "shop-name": shopName,
      ...rest
    } = Object.fromEntries(new FormData(e.target).entries());
    rest.shopDetails = {
      ownerName,
      ownerEmail,
      "shop-name": shopName,
    };
    rest.price = parseFloat(price);

    axios
      .post("/addProducts", rest)
      .then((data) => {
        if (data.insertedId) {
          toast.success("Product Added", {
            position: "top-right",
            className: "font-semibold text-lg",
          });
        }
        nav("/products/me");
      })
      .catch((err) => {
        toast.error(err?.message);
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const {
      price,
      ownerName,
      ownerEmail,
      "shop-name": shopName,
      ...rest
    } = Object.fromEntries(new FormData(e.target).entries());
    rest.shopDetails = {
      ownerName,
      ownerEmail,
      "shop-name": shopName,
    };
    rest.price = parseFloat(price);

    axios
      .put(`/products/${editProduct._id}`, rest)
      .then((res) => res.data)
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Update Successfully");
          nav("/products/me");
        }
      });
  };

  return (
    <div className="gadgetContainer pt-10">
      <div className="shadow-lg p-5 border dark:bg-[#1a2641d5]">
        {/* Heading */}
        <div className="mt-5 mb-8">
          <p className="text-center text-3xl font-semibold">
            <span className="mr-3 text-[#FF497C]">
              <i className="bx bxs-alarm-add"></i>
            </span>
            <span className="dark:text-white">
              <span className="text-[#FF497C]">
                {update ? "Update " : "Add "}
              </span>
              Your Product
            </span>
          </p>
        </div>

        {/* form */}
        <form onSubmit={update ? handleUpdate : handleAddProduct}>
          <div className="flex gap-8 ">
            <div className="flex-1">
              <label className="block mb-2 dark:text-white" htmlFor="name">
                Name
              </label>
              <input
                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                defaultValue={editProduct ? editProduct.name : ""}
              />

              <label
                className="block mt-4 mb-2 dark:text-white"
                htmlFor="brand"
              >
                Brand Name
              </label>
              <select
                name="brand"
                id="brand"
                className="w-full dark:text-white dark:bg-black/80 p-2 border rounded-md focus:outline-[#FF497C]"
                value={selectedBrand}
                onChange={handleChange}
              >
                <option value="Samsung">Samsung</option>
                <option value="IPhone">IPhone</option>
                <option value="Oppo">Oppo</option>
                <option value="Huawei">Huawei</option>
              </select>

              <label
                className="block mt-4 mb-2 dark:text-white"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                type="text"
                placeholder="Enter Price"
                id="price"
                name="price"
                defaultValue={editProduct ? editProduct.price : ""}
              />
              <div className="w-full">
                <label
                  className="block  mb-2 mt-4 dark:text-white"
                  htmlFor="company"
                >
                  Company
                </label>
                <input
                  className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                  type="text"
                  placeholder="Enter Company Name"
                  id="company"
                  name="company"
                  defaultValue={editProduct ? editProduct.company : ""}
                />
              </div>
              <div className="w-full">
                <label className="block  mb-2 mt-4 dark:text-white">
                  Owner Name
                </label>
                <input
                  className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                  type="text"
                  readOnly={!editProduct.shopDetails?.ownerName}
                  name="ownerName"
                  defaultValue={editProduct.userName || user?.displayName}
                />
              </div>

              <div className="w-full">
                <label
                  className="block  mb-2 mt-4 dark:text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  defaultValue={editProduct ? editProduct.description : ""}
                  id="description"
                  name="description"
                  className="textarea w-full"
                  placeholder="Bio"
                ></textarea>
              </div>
            </div>
            {/* Right side */}
            <div className="flex-1">
              <label className="block mb-2 dark:text-white" htmlFor="image">
                Image
              </label>
              <input
                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                type="text"
                placeholder="Enter Image URL"
                id="image"
                name="image"
                defaultValue={editProduct ? editProduct.image : ""}
              />
              <label
                className="block mb-2 mt-4 dark:text-white"
                htmlFor="shopName"
              >
                Shop Name
              </label>
              <input
                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                type="text"
                placeholder="Enter shop name"
                id="shopName"
                name="shop-name"
                defaultValue={editProduct?.["shopDetails"]?.["shop-name"] || ""}
              />

              <label
                className="block  mt-4 mb-2 dark:text-white"
                htmlFor="rating"
              >
                Rating
              </label>
              <input
                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                maxLength={5}
                max={5}
                min={0}
                type="number"
                placeholder="Enter Rating"
                id="rating"
                name="rating"
                defaultValue={editProduct ? editProduct.rating : ""}
              />

              <label
                className="block  mt-4 mb-2 dark:text-white"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                defaultValue={editProduct ? editProduct.category : ""}
                id="category"
                className="select"
              >
                <option value="" hidden disabled={true}>
                  Pick a Category
                </option>
                <option>Smart Watch</option>
                <option>Mobiles</option>
                <option>Camera</option>
              </select>

              <div className="w-full">
                <label className="block  mb-2 mt-4 dark:text-white">
                  Owner Email
                </label>
                <input
                  className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                  type="email"
                  readOnly={!editProduct?.shopDetails?.ownerEmail}
                  name="ownerEmail"
                  defaultValue={editProduct.ownerEmail || user?.email}
                />
              </div>
            </div>
          </div>

          <input
            className="px-4 w-full py-2 mt-4 rounded hover:bg-[#ab3154]  bg-[#FF497C] duration-200 text-white cursor-pointer font-semibold"
            type="submit"
            value={update ? "Update Product" : "Add Product"}
            // update Add Product
          />
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
