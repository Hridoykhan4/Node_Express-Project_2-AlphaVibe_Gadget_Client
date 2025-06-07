import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";

const useAuth = () => {
  const all = useContext(AuthContext);
  return all;
};

export default useAuth;
