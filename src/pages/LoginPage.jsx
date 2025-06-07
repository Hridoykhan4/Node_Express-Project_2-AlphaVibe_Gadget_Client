import signIn from "../assets/signIn.jpg";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner";
// import Spinner from "../components/Spinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signInUser, logInWithGoogle, setLoading, loading } = useAuth();
  const location = useLocation();
  // google sign in
  const handleGoogleSignIn = () => {
    logInWithGoogle()
      .then((result) => {
        const name = result?.user?.displayName;
        const email = result?.user?.email;
        const lastSignIn = result?.user?.metadata?.lastSignInTime;
        const info = { name, email, lastSignIn: lastSignIn };

        fetch(`https://alphavibe-gadgets.web.app/users`)
          .then((res) => res.json())
          .then((data) => {
            if (!data?.exists) {
              fetch(`https://alphavibe-gadgets.web.app/users`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(info),
              });
            }
          });

        setLoading(false);

        navigate(location?.state ? location.state : "/");
        toast.success("Login successful");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form?.email.value;
    const password = form?.password.value;

    // Sign In
    signInUser(email, password)
      .then((res) => {
        const lastSignInTime = res?.user?.metadata?.lastSignInTime;
        const logInfo = { email, lastSignInTime };

        fetch(`https://alphavibe-gadgets.web.app/users`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(logInfo),
        });

        setLoading(false);
        navigate(location?.state ? location.state : "/");
        toast.success("Login successful");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className="gadgetContainer px-10">
      {loading && <Spinner />}
      <div className="flex  md:justify-between items-center justify-center flex-wrap gap-4">
        <img className="h-[100px]" src={logo} alt="" />
        <div>
          Not a member?
          <Link
            className="px-3 ml-3 py-2 bg-[#FF497C] hover:bg-[#ab3154] rounded text-white font-semibold"
            to="/signUp"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <p
        onClick={() => navigate("/")}
        className="text-lg font-semibold text-[#FF497C] my-1 cursor-pointer hover:bg-[#FF497C] inline-block rounded py-1 px-2 hover:text-white duration-200"
      >
        <i className="bx bx-left-arrow-alt"></i> <span>Back Home</span>
      </p>

      <div className="border shadow-lg mt-4">
        <div className="w-full  flex">
          <div
            className="w-full  bg-gray-400 hidden lg:block  bg-no-repeat  lg:w-1/2  rounded-l-lg "
            style={{
              background: `url(${signIn})`,
              backgroundSize: "100% 100%",
              backgroundOrigin: "content-box",
            }}
          >
            <p className="font-bold text-3xl mt-20 mx-6">
              We Offer the <br />
              Best Products
            </p>
          </div>

          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className=" p-5 ">
              <div className="pb-8">
                <p className="text-3xl font-bold mb-2">
                  Sign in to GigaGadgets.
                </p>

                <p className="font-semibold text-black/60">
                  Enter your details below
                </p>
              </div>

              <div className="flex items-center flex-wrap md:flex-nowrap gap-4 mb-4">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full max-w-md font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign In with Google</span>
                </button>
              </div>

              <div className="my-5 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium  transform translate-y-3/4">
                  Or sign In with e-mail
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-3 w-full ">
                <div>
                  <fieldset className="border border-solid border-gray-300 p-3 w-full rounded">
                    <legend className=" font-medium text-black/60">
                      Email
                    </legend>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="px-4 py-1 w-full focus:outline-0"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="border border-solid border-gray-300 p-3 w-full rounded">
                    <legend className=" font-medium text-black">
                      Password
                    </legend>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className="px-4 py-1 w-full text-black focus:outline-0"
                    />
                  </fieldset>
                </div>

                <button className="px-3 py-2 bg-[#FF497C] hover:bg-[#ab3154] rounded text-white font-semibold">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default LoginPage;
