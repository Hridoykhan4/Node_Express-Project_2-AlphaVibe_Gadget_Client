import heroImg1 from "../assets/Hero/2.png";
import heroImg2 from "../assets/Hero/lgFreeze.png";
import heroImg3 from "../assets/Hero/applelaptop.png";
import { EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

const Hero = () => {
  return (
    <div className=" relative rounded-b-2xl overflow-hidden">
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
      >
        {[heroImg1, heroImg2, heroImg3].map((img, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-[calc(100vh-100px)]  flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-12 relative">
              {/* Text Section */}
              <div className="flex-1 dark:text-white z-10">
                <p className="font-semibold text-[#FF497C] mb-3 text-center md:text-left">
                  <span className="bg-[#FF497C] mr-3 text-xl px-2 py-1 rounded-full">
                    <i className="bx bxs-hot"></i>
                  </span>
                  Top Brands
                </p>

                <h1 className="xl:text-[50px] lg:text-[40px] md:text-[32px] text-[28px] font-bold text-center md:text-left">
                  {i === 0 && "Discover the Future of Electronics"}
                  {i === 1 && "Your Trusted Source for Quality Gadgets"}
                  {i === 2 && "Shop Smart, Shop TechWonders"}
                </h1>

                <p className="text-black/70 md:text-lg mt-3 text-center md:text-left">
                  {i === 0 &&
                    "Stay ahead with the latest tech trends and innovations."}
                  {i === 1 &&
                    "Explore a wide range of cutting-edge electronic devices."}
                  {i === 2 &&
                    "Find the perfect tech solutions for your lifestyle."}
                </p>

                <div className="flex justify-center md:justify-start">
                  <button className="bg-[#FF497C] py-2 mt-6 px-5 rounded font-semibold hover:bg-[#ab3154] text-white transition duration-300">
                    <span className="mr-2">
                      <i className="bx bx-hive"></i>
                    </span>
                    Explore Now
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="flex-1 max-h-[500px] h-[300px] md:h-[450px] w-full z-10">
                <img
                  src={img}
                  className="h-full w-full object-contain transition-all duration-500 ease-in-out"
                  alt="hero-img"
                />
              </div>

              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white/30 z-0"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
