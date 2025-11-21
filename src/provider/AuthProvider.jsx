import AuthContext from "../Contexts/AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useEffect, useState } from "react";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const axiosInstance = axios.create({
  baseURL: `http://localhost:5000`,
  withCredentials: true,
});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //   Sign Up with Email
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Login With Google
  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   logOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
      setLoading(true);
      try {
        if (currentUser?.email) {
          const email = { email: currentUser?.email };
          const { data } = await axiosInstance.post(
            `http://localhost:5000/jwt`,
            email
          );
          // console.log(data);
        } else {
          const { data } = await axiosInstance.post("/logout", {});
          // console.log(data, "logout");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  //   Sign In user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Update Password
  const handleUpdatePassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update User Profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createNewUser,
    logInWithGoogle,
    logOut,
    signInUser,
    handleUpdatePassword,
    updateUserProfile,
    theme,
    setTheme,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
