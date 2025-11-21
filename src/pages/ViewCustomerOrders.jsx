import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";

const ViewCustomerOrders = () => {
  const axios = useAxios();
  const { id } = useParams();
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios(`/my-products/customer/${id}`)
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, [axios, id]);

  console.log(customers);
  const handleUpdateStatus = (e, id) => {
    const orderStatus = e.target.value;
    axios
      .patch(`/products/${id}`, { orderStatus })
      .then((res) => {
        console.log(res.data);
        setCustomers((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, orderStatus } : item
          )
        );
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2 className="text-xl text-center pt-4 underline">Customers List</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Delivery</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer, i) => (
              <tr key={customer._id}>
                <th>{i + 1}</th>
                <td>{customer?.customerInfo?.name}</td>
                <td>{customer?.customerInfo?.email}</td>
                <td>
                  {customer?.customerInfo?.location.length > 20 ? (
                    <span>
                      {customer?.customerInfo?.location.slice(0, 20)}
                      <br />
                      {customer?.customerInfo?.location.slice(20)}
                    </span>
                  ) : (
                    customer?.customerInfo?.location
                  )}{" "}
                  <br />
                  {customer?.customerInfo?.phoneNumber}
                </td>
                <td>
                  <select
                    required
                    value={customer?.orderStatus || ""}
                    onChange={(e) => handleUpdateStatus(e, customer._id)}
                    className="select"
                  >
                    <option value="" hidden disabled={true}>
                      Choose Options
                    </option>
                    <option value="confirm">Confirm</option>
                    <option value="cancel">Cancel</option>
                    <option value="shipping">Shipping</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCustomerOrders;
