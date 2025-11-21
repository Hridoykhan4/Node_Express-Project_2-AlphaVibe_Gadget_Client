import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData() || [];
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState(loadedUsers || []);

  useEffect(() => {
    fetch(`http://localhost:5000/users?searchUser=${searchUser}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [searchUser]);

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:5000/user/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          toast.success("User Deleted Successfully", {
            position: "top-right",
            className: "font-semibold text-lg",
          });
          const remaining = users?.filter((user) => user?._id !== userId);
          setUsers(remaining);
        }
      });
  };

  return (
    <div className="py-10 px-4 md:px-8">
      <h2 className="text-center text-2xl font-bold   dark:text-white mb-6">
        👥 Total Users:{" "}
        <span className="text-blue-600 dark:text-blue-400">
          {users?.length}
        </span>
      </h2>

      <div className="text-center my-3 ">
        <input
          onChange={(e) => setSearchUser(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Search"
          className="input max-w-sm mx-auto  input-primary py-4"
        />
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 dark:bg-base-400 rounded-xl shadow-lg transition-colors duration-300">
        <table className="table w-full ">
          <thead className="bg-blue-600 text-white dark:bg-blue-700">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Last Login</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-gray-200">
            {users?.map((user, i) => (
              <tr
                key={user?._id}
                className="hover:bg-blue-50 dark:hover:bg-gray-500 transition-all duration-300"
              >
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4 font-medium">{user?.name}</td>
                <td className="py-2 px-4 text-blue-700 dark:text-blue-400">
                  {user?.email}
                </td>
                <td className="py-2 px-4">{user?.lastSignIn}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Link
                    to={`/userUpdate/${user?._id}`}
                    className="btn btn-xs btn-outline btn-info tooltip"
                    data-tip="Edit User"
                  >
                    <FaPencil />
                  </Link>
                  <button
                    onClick={() => handleDeleteUser(user?._id)}
                    className="btn btn-xs btn-outline btn-error tooltip"
                    data-tip="Delete User"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
