"use client";
import Link from "next/link";
import { IoLogoInstagram, IoLogoTiktok } from "react-icons/io5";

const SocialLink = ({ href, icon }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    {icon}
  </Link>
);
const Personal = () => {
  return (
    <div className="font-poppins  relative">
      <div
        id="container"
        className="p-4 sm:p-20 w-auto flex px-4 sm:px-24 justify-center relative"
      >
        <div
          id="container"
          className="p-4   sm:p-16 md:p-20 lg:p-24 xl:p-20 w-full sm:w-auto flex flex-col md:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative"
        >
          <div className="sm:mr-10">
            <img
              className="rounded-lg min-w-[100px] w-full h-auto md:w-auto md:h-auto"
              src="/assets/Screen Shot 2025-03-17 at 00.41.25.png"
              alt="image of myself"
            />
          </div>
          <div className="w-full sm:w-[70%]  md:w-[60%] lg:w-[50%]">
            <h1 className="text-grey-600 font-bold text-2xl mt-6 sm:mt-0 mb-8">
              Hey it's me, Wilie Effendi
            </h1>

            <p className="text-grey-600 w-full sm:w-[35rem] md:w-[30rem] lg:w-[25rem] mb-10">
              <p className="mb-4">
                Hello, I'm Wilie Effendi, a passionate photographer and
                content creator committed to capturing life's most beautiful
                moments. My journey in visual storytelling has led me to create
                stunning images and videos that resonate with emotion and
                artistry.
              </p>
              <p className="mb-4">
                In my personal website, you'll find a curated collection of my
                work, along with Lightroom presets, power grades, and LUTs
                designed to elevate your own photography and videography
                projects. Whether you're a professional or an enthusiast, my
                tools can help you achieve your creative vision effortlessly.
              </p>
              <p>
                Additionally, I love sharing insights and experiences through my
                blog, where I discuss various topics related to photography,
                videography, and tips to enhance your skill set. Join me on this
                visual journey, and let's create something extraordinary
                together!
              </p>
            </p>

            <div
              id="social"
              className="flex flex-row flex-wrap justify-start items-center gap-4"
            >
              {/*
              <SocialLink
                href="https://www.youtube.com"
                icon={<IoLogoYoutube size={20} />}
              />
               */}
              <SocialLink
                href="https://www.instagram.com/wilieeffendi"
                icon={<IoLogoInstagram size={20} />}
              />
              <SocialLink
                href="https://www.tiktok.com/@wilieeffendi"
                icon={<IoLogoTiktok size={20} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
