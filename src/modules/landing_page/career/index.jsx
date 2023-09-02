// import React from "react";
import { Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

export const CareerModule = () => {
  return (
    <div>
      <section className="bg-theme-cream px-5 md:px-28 gap-5 md:pt-32 pt-28 pb-10">
        <div className="text-center">
          <h1 className="font-extrabold text-6xl text-[#78002C] mb-5">
            Join Our Team!
          </h1>
          <p className="text-lg mb-12 ">
            Join us and Let’s bring joy to our costumer!
          </p>
        </div>
        <div>
          <h2 className="font-extrabold text-4xl text-[#78002C] mb-5">
            Available Job Vacancy
          </h2>
          <div className="w-full px-4 ">
            <div className="mx-auto w-full  rounded-2xl p-2">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between px-4 py-2 text-left text-lg font-bold border-b-2 border-theme-red hover:bg-[#0000000d] focus:outline-none focus-visible:ring ">
                      <span>Graphic Design - Jakarta</span>
                      <FiChevronDown
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-theme-red`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-base">
                      <div className="bg-theme-peach py-5 px-10 my-3 rounded-lg text-center">
                        <span className="text-white ">
                          Send your CV to yollscake.career@mail.com with subject
                          ‘Job Application - Graphic Design - Jakarta’
                        </span>
                      </div>
                      <div className="mt-5">
                        <div>
                          <p className="font-bold">Job Description :</p>
                          <p>
                            As a Graphic Designer at [Your Company Name], you
                            will play a pivotal role in creating visually
                            stunning designs that captivate and engage our
                            audience. {`You'll`}
                            collaborate with our marketing and creative teams to
                            design materials across various platforms, ensuring
                            our brand remains at the forefront of innovation and
                            style.
                          </p>
                        </div>
                        <div>
                          <p className="font-bold">Responsibilities:</p>
                          <ol className="list-decimal list-inside">
                            <li>
                              Create eye-catching visual content for digital and
                              print media.
                            </li>
                            <li>
                              Design marketing collateral, including brochures,
                              flyers, and banners.
                            </li>
                            <li>
                              Produce graphics for social media, websites, and
                              email campaigns.
                            </li>
                          </ol>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between px-4 py-2 text-left text-lg font-bold border-b-2 border-theme-red hover:bg-[#0000000d] focus:outline-none focus-visible:ring ">
                      <span>Graphic Design - Jakarta</span>
                      <FiChevronDown
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-theme-red`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-base">
                      <div className="bg-theme-peach py-5 px-10 my-3 rounded-lg text-center">
                        <span className="text-white ">
                          Send your CV to yollscake.career@mail.com with subject
                          ‘Job Application - Graphic Design - Jakarta’
                        </span>
                      </div>
                      <div className="mt-5">
                        <div>
                          <p className="font-bold">Job Description :</p>
                          <p>
                            As a Graphic Designer at [Your Company Name], you
                            will play a pivotal role in creating visually
                            stunning designs that captivate and engage our
                            audience. {`You'll`}
                            collaborate with our marketing and creative teams to
                            design materials across various platforms, ensuring
                            our brand remains at the forefront of innovation and
                            style.
                          </p>
                        </div>
                        <div>
                          <p className="font-bold">Responsibilities:</p>
                          <ol className="list-decimal list-inside">
                            <li>
                              Create eye-catching visual content for digital and
                              print media.
                            </li>
                            <li>
                              Design marketing collateral, including brochures,
                              flyers, and banners.
                            </li>
                            <li>
                              Produce graphics for social media, websites, and
                              email campaigns.
                            </li>
                          </ol>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
