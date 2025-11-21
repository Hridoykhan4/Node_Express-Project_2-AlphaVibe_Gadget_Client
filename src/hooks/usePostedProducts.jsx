import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";

const usePostedProducts = (email) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (!email) return;

    setLoading(true);
    // axiosSecure(`http://localhost:5000/my-products?email=${email}`)
    axiosSecure(`http://localhost:5000/my-products?email=${email}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setProducts([]);
        setLoading(false);
        console.log(err);
      });
  }, [email, axiosSecure]);

  return { products, loading };
};

export default usePostedProducts;
