// import React from 'react'

import { LinkButton } from "../../../components";

export const AboutUsModule = () => {
  return (
    <div>
      <section className="bg-[url('/patternBG1.svg')] bg-cover bg-left flex items-center justify-center gap-2 md:gap-12 px-5 md:px-28 flex-col md:flex-row py-28">
        <img
          src="/aboutUsHero.svg"
          className="h-auto md:w-1/2 max-w-full mb-10 md:mb-0"
        />
        <div>
          <h1 className="font-extrabold text-6xl text-[#78002C] mb-5">About</h1>
          <h1 className="font-extrabold text-6xl text-[#78002C] mb-5">
            Yolls Cake & Cookies
          </h1>
          <p className="text-lg mb-12 ">
            We use traditional recipes passed down from generation to
            generation. we maintain quality with natural ingredients. The
            products we offer are freshly mad
          </p>
        </div>
      </section>
      <section className="bg-theme-peach h-full md:h-[90vh] bg-cover bg-left flex items-center justify-center gap-2 md:gap-12 px-5 md:px-28 flex-col md:flex-row ">
        <div className="mb-5 md:mb-0">
          <h1 className="font-extrabold text-6xl text-[#78002C] mb-5 mt-10 md:mt-0">
            Where we are?
          </h1>
          <p className="text-lg mb-12 ">
            Found us at Jalan Nusantara Raya No.20, Depok Jaya, Pancoran Mas,
            Depok
          </p>
          <LinkButton
            text={"See Map"}
            to={"https://goo.gl/maps/tgL3RGrojcZ69nUX7"}
            className={
              "bg-theme-brown text-white hover:border-2 hover:border-theme-brown hover:bg-transparent hover:text-[#AE4E38]"
            }
          />
        </div>
        <div className="h-auto md:w-1/2 max-w-full mb-10 md:mb-0 rounded-md ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.964516430979!2d106.81116477483819!3d-6.398574162581295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e95eede57669%3A0x4b320e72bd60fa1!2sNo%20Jl.%20Nusantara%20Raya%20No.20%2C%20Depok%20Jaya%2C%20Kec.%20Pancoran%20Mas%2C%20Kota%20Depok%2C%20Jawa%20Barat%2016436!5e0!3m2!1sen!2sid!4v1693537158903!5m2!1sen!2sid"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "25px" }}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      <section className="bg-theme-cream h-screen md:h-[90vh] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-16 px-5 md:px-28">
        <div className="grid grid-cols-2 gap-2 md:gap-5 w-full md:w-2/5">
          <img src="./instagram_1.svg" alt="" className="h-auto max-w-full" />
          <img src="./instagram_2.svg" alt="" className="h-auto max-w-full" />
          <img src="./instagram_3.svg" alt="" className="h-auto max-w-full" />
          <img src="./instagram_4.svg" alt="" className="h-auto max-w-full" />
        </div>
        <div className="w-full md:w-2/5 mt-5 md:mt-0">
          <h1 className="font-extrabold text-6xl text-[#78002C] mb-5">
            Our Instagram
          </h1>
          <p className="text-lg mb-12 ">
            Follow our instagram @yolls.cake to get the latest info from us!
          </p>
          <LinkButton
            text={"@yolls.cake"}
            to={"https://www.instagram.com/yolls.cake/"}
            className={
              "bg-theme-brown text-white hover:border-2 hover:border-theme-brown hover:bg-transparent hover:text-[#AE4E38]"
            }
          />
        </div>
      </section>
      <section className=" bg-theme-peach grid grid-cols-1 px-5 md:px-28 py-10 md:py-24 gap-10 text-center">
        <h2 className="font-bold text-3xl text-red">Contact Us</h2>
        <div className="flex justify-center gap-5">
          <LinkButton
            text={"Whatsapp"}
            to={"https://wa.me/6281380330388?text=Halo%20Yolls%20Cake!"}
            className={
              "bg-theme-brown text-white hover:bg-white hover:text-theme-brown min-w-[150px]"
            }
          />

          <LinkButton
            text={"Customer Service"}
            to={"/customer-service"}
            className={
              "bg-theme-brown text-white hover:bg-white hover:text-theme-brown min-w-[150px]"
            }
          />
        </div>
      </section>
    </div>
  );
};
