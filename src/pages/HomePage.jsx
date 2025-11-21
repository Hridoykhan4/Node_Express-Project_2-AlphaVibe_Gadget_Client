import { Suspense, useState } from "react";
import Hero from "../components/Hero";
import choose1 from "../assets/whyChoose/1.webp";
import choose2 from "../assets/whyChoose/2.webp";
import choose3 from "../assets/whyChoose/3.webp";
import choose4 from "../assets/whyChoose/4.webp";
import choose5 from "../assets/whyChoose/5.webp";
import useAxios from "../hooks/useAxios";
import ProductContainer from "../components/ProductContainer";
const HomePage = () => {
  const [err, setErr] = useState(null);
  const axios = useAxios();
  const productPromise = axios("/products?featured=homeFeatured")
    .then((res) => res.data)
    .catch((err) => setErr(err));

  if (err) return <h2 className="text-red-600">{err?.code}</h2>;
  return (
    <section>
      <Hero />

      <h2 className="text-center mb-6 text-2xl font-semibold mt-4">
        My Products
      </h2>
      <div className="gadgetContainer pt-2 px-4 md:px-8">
        <div>
          <Suspense fallback={<p>Loading ...</p>}>
            <ProductContainer
              productPromise={productPromise}
            ></ProductContainer>
          </Suspense>
        </div>
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
