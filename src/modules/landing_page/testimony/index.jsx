// import React from "react";

export const TestimonyModule = () => {
  return (
    <div>
      <section className="bg-[url('./patternBG1.svg')] bg-cover bg-left px-5 md:px-28 gap-5 md:pt-32 pt-28 pb-10">
        <h1 className="font-extrabold text-6xl text-[#78002C] mb-5">
          What they say about us?
        </h1>
        <div className="flex flex-row flex-wrap gap-5 justify-center">
          <div className="bg-theme-peach rounded-lg p-5 w-1/4 shadow-lg">
            <img
              src="./testimoni/testimoni1.webp"
              alt=""
              className="w-full md:w-1/2 mx-auto"
            />
            {/* <hr className="h-px my-8 bg-[#868282] border-0" />
            <p className="font-bold text-theme-red">Bambang</p>
            <p>Finance Manager, Customer</p> */}
          </div>
          <div className="bg-theme-peach rounded-lg p-5 w-1/4 shadow-lg">
            <img
              src="./testimoni/testimoni2.webp"
              alt=""
              className="w-full md:w-1/2 mx-auto"
            />
            {/* <hr className="h-px my-8 bg-[#868282] border-0" />
            <p className="font-bold text-theme-red">Bambang</p>
            <p>Finance Manager, Customer</p> */}
          </div>
          <div className="bg-theme-peach rounded-lg p-5 w-1/4 shadow-lg">
            <img
              src="./testimoni/testimoni3.webp"
              alt=""
              className="w-full md:w-1/2 mx-auto"
            />
            {/* <hr className="h-px my-8 bg-[#868282] border-0" />
            <p className="font-bold text-theme-red">Bambang</p>
            <p>Finance Manager, Customer</p> */}
          </div>
          <div className="bg-theme-peach rounded-lg p-5 w-1/4 shadow-lg">
            <img
              src="./testimoni/testimoni4.webp"
              alt=""
              className="w-full md:w-1/2 mx-auto"
            />
            {/* <hr className="h-px my-8 bg-[#868282] border-0" />
            <p className="font-bold text-theme-red">Bambang</p>
            <p>Finance Manager, Customer</p> */}
          </div>
        </div>
      </section>
    </div>
  );
};
