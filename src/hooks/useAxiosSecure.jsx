import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: `http://localhost:5000`,
  withCredentials: true,
});
const useAxiosSecure = () => {
  const nav = useNavigate();
  const { logOut } = useAuth();
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error?.response?.data?.message || error?.message) toast.error(error?.response?.data?.message || error?.message);

        logOut()
          .then(() => nav("/signIn"))
          .catch((err) => console.log(err));

        return Promise.reject(error);
      }
    );

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [nav, logOut]);

  return axiosInstance;
};

export default useAxiosSecure;
