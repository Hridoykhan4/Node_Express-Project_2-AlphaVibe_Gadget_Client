import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const UserUpdatePage = () => {
  const user = useLoaderData();
  const handleUserNameUpdate = (e) => {
    e.preventDefault();
    const userName = e.target.name.value;
    fetch(`https://alphavibe-gadgets.web.app/updateUser/${user?._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Name Updated", {
            position: "top-right",
            className: "font-semibold text-lg",
          });
        } else {
          toast.error("Name Not Updated", {
            position: "top-left",
            className: "font-semibold text-lg",
          });
        }
      });
  };

  return (
    <form
      onSubmit={handleUserNameUpdate}
      className="max-w-md mx-auto dark:bg-lack  p-8 rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center ">Update User Name</h2>

      <div>
        <label htmlFor="name" className="block  text-sm font-medium  mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={user?.name}
          id="name"
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium  mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={user?.email}
          readOnly
          id="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <input
        type="submit"
        className="w-full bg-indigo-600  font-semibold py-2 rounded-xl hover:bg-indigo-700 transition-all duration-200"
        value={`Update Name`}
      />
    </form>
  );
};

export default UserUpdatePage;
