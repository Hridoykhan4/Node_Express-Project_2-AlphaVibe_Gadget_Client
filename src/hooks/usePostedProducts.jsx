import axios from "axios";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useEffect } from "react";

const usePostedProducts = (email) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!email) return;

    setLoading(true);
    axios(`http://localhost:5000/my-products?email=${email}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setProducts([]);
        setLoading(false);
        console.log(err);
      });
  }, [email]);

  return { products, loading };
};

export default usePostedProducts;
