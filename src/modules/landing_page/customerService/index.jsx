// import React from "react";

export const CustomerServiceModule = () => {
  return (
    <div>
      <section className="bg-[url('./patternBG1.svg')] bg-cover bg-left flex md:items-start items-center justify-between md:flex-row flex-col px-5 md:px-28 gap-5 md:pt-32 pt-28 pb-10">
        <div className="w-full md:w-1/2">
          <h1 className="font-extrabold text-6xl text-[#78002C] mb-5">
            Customer Service
          </h1>
          <p className="text-2xl mb-12">
            We valued your feedback, please sent your feedback to help us grow
          </p>
        </div>
        <div className="w-full md:w-1/2 mx-0 md:mx-10">
          <form action="" className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="font-bold ">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="shadow-md rounded-lg border-2 border-theme-peach text-base w-full h-10 px-5"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-bold ">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="shadow-md rounded-lg border-2 border-theme-peach text-base w-full h-10 px-5"
              />
            </div>
            <div>
              <label htmlFor="subject" className="font-bold ">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                className="shadow-md rounded-lg border-2 border-theme-peach text-base w-full h-10 px-5"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-bold ">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="shadow-md rounded-lg border-2 border-theme-peach text-base w-full px-5 py-2"
                rows={5}
              />
            </div>
            <div>
              <button
                type="submit"
                className="focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 inline-block bg-theme-brown text-white hover:border-2 hover:border-theme-brown hover:bg-transparent hover:text-[#AE4E38] min-w-[150px] font-bold"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
