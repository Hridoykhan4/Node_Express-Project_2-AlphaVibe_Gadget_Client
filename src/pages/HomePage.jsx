import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import useAuth from "../hooks/useAuth";
import ProductCard from "../components/ProductCard";
import choose1 from "../assets/whyChoose/1.webp";
import choose2 from "../assets/whyChoose/2.webp";
import choose3 from "../assets/whyChoose/3.webp";
import choose4 from "../assets/whyChoose/4.webp";
import choose5 from "../assets/whyChoose/5.webp";
import { Link } from "react-router-dom";
const HomePage = () => {
  const { user, loading } = useAuth() || {};
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://alpha-vibe-server.vercel.app/myProducts/${user.email}`
        );
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  return (
    <section>
      <Hero />

      <h2 className="text-center text-2xl font-semibold mt-8 mb-2">
        My Products
      </h2>
      <div className="gadgetContainer pt-2 px-4 md:px-8">
        {loading ? (
          <p className="text-center text-lg font-medium text-blue-500 animate-pulse">
            Loading your products...
          </p>
        ) : products.length > 0 ? (
          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {products.map((p, index) => (
              <ProductCard
                key={p._id || index}
                p={p}
                products={products}
                setProducts={setProducts}
                myCard={true}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-4 space-y-4">
            {!user && (
              <Link
                to="/signIn"
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
              >
                Log in First
              </Link>
            )}
            {loading ||
              (!user && (
                <p className="text-center dark:text-white text-gray-500 text-sm">
                  You have no products yet.{" "}
                  <Link className="link link-accent" to="/product/add">
                    Add Product
                  </Link>
                </p>
              ))}
          </div>
        )}
      </div>

      <div className="gadgetContainer pb-10">
        {/* header */}
        <div className="text-center md:text-left mt-20">
          <p className="font-semibold text-[#FF497C] mb-3 text-center md:text-left">
            <span className="bg-[#FF497C] text-white mr-3 text-xl px-2 py-1 rounded-full">
              <i className="bx bxs-like"></i>
            </span>
            Why Us
          </p>
          <p className="text-[32px] lg:text-[40px] font-semibold dark:text-white">
            Why People Choose Us
          </p>
        </div>

        {/* Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
          <div className="py-6 px-2 shadow  flex justify-center items-center flex-col gap-4 dark:bg-[#1a2641d5]">
            <img src={choose1} alt="" />
            <p className="font-semibold text-lg text-center dark:text-white">
              Fast & Secure <br />
              Delivery
            </p>
          </div>
          <div className="py-6 px-2 shadow  flex justify-center items-center flex-col gap-4 dark:bg-[#1a2641d5]">
            <img src={choose2} alt="" />
            <p className="font-semibold text-lg text-center dark:text-white">
              Money Back <br />
              Guarantee
            </p>
          </div>
          <div className="py-6 px-2 shadow  flex justify-center items-center flex-col gap-4 dark:bg-[#1a2641d5]">
            <img src={choose3} alt="" />
            <p className="font-semibold text-lg text-center dark:text-white">
              24 Hour Return <br />
              Policy
            </p>
          </div>
          <div className="py-6 px-2 shadow  flex justify-center items-center flex-col gap-4 dark:bg-[#1a2641d5]">
            <img src={choose4} alt="" />
            <p className="font-semibold text-lg text-center dark:text-white">
              Pro Quality <br />
              Support
            </p>
          </div>
          <div className="py-6 px-2 shadow  flex justify-center items-center flex-col gap-4 dark:bg-[#1a2641d5]">
            <img src={choose5} alt="" />
            <p className="font-semibold text-lg text-center dark:text-white">
              Next Level Pro <br />
              Quality
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
