// import React from "react";

export const TestimonyModule = () => {
  return (
    <div>
      <section className="bg-[url('./patternBG1.svg')] bg-cover bg-left px-5 md:px-28 gap-5 md:pt-32 pt-28 pb-10">
        <h1 className="font-extrabold text-6xl text-[#78002C] mb-5">
          What they say about us?
        </h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          <div className="bg-theme-peach rounded-lg p-5">
            <img
              src="./testimoni.png"
              alt=""
              className="w-full md:w-1/2 mx-auto"
            />
            <hr className="h-px my-8 bg-[#868282] border-0" />
            <p className="font-bold text-theme-red">Bambang</p>
            <p>Finance Manager, Customer</p>
          </div>
          <div className="bg-theme-peach rounded-lg p-5">
            <img
              src="./testimoni.png"
              alt=""
              className="w-full md:w-1/2 mx-auto"
            />
            <hr className="h-px my-8 bg-[#868282] border-0" />
            <p className="font-bold text-theme-red">Bambang</p>
            <p>Finance Manager, Customer</p>
          </div>
          <div className="bg-theme-peach rounded-lg p-5">
            <img
              src="./testimoni.png"
              alt=""
              className="w-full md:w-1/2 mx-auto"
            />
            <hr className="h-px my-8 bg-[#868282] border-0" />
            <p className="font-bold text-theme-red">Bambang</p>
            <p>Finance Manager, Customer</p>
          </div>
        </div>
      </section>
    </div>
  );
};
