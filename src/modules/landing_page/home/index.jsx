import { LinkButton } from "../../../components";

export const HomeModule = () => {
  return (
    <div>
      <section className="bg-[url('./heroBG.svg')] h-screen md:h-[90vh] bg-cover bg-left flex justify-center flex-col px-5 md:px-28">
        <h1 className="font-extrabold text-6xl text-[#78002C] mb-5">
          Yolls Cake & Cookies
        </h1>
        <p className="text-2xl mb-12">
          Our trust is natural quality and freshly made
        </p>
        <div>
          <LinkButton
            to="/"
            text="See Our Menu"
            className={
              "bg-theme-brown text-white hover:border-2 hover:border-theme-brown hover:bg-transparent hover:text-[#AE4E38]"
            }
          />
        </div>
      </section>
      <section className="bg-[#F0D9C7]  grid grid-cols-1 md:grid-cols-2 p-5 md:px-28 md:py-20">
        <img
          className="h-auto max-w-full mb-10 md:mb-0"
          src="./latest_creation.svg"
          alt="latest creation"
        />
        <div className="flex flex-col justify-center gap-5 md:gap-10">
          <h2 className="font-bold text-5xl text-theme-red">
            Get our Latest Creation
          </h2>
          <p>
            {`Indulge your taste buds with our latest culinary masterpieces. We've
          been hard at work crafting the most delightful treats just for you.
          Check out our new creations:`}
          </p>
          <ol className="list-decimal list-inside">
            <li className="mb-3">
              <b>Red Velvet Cookie</b>
              <ul className="pl-5 space-y-1 list-none list-inside">
                <li>
                  Calling all cookie lovers! Our Red Velvet Cookie is a symphony
                  of rich cocoa and velvety goodness. Each bite is a heavenly
                  blend of sweet and slightly tangy
                </li>
              </ul>
            </li>
            <li className="mb-3">
              <b>Mango Pudding</b>
              <ul className="pl-5 space-y-1 list-none list-inside">
                <li>
                  Experience a burst of tropical flavor with our Mango Pudding
                </li>
              </ul>
            </li>
            <li className="mb-3">
              <b>Fruit Cake and Kastangel</b>
              <ul className="pl-5 space-y-1 list-none list-inside">
                <li>
                  Our Fruit Cake has received a delightful companion - the
                  Kastangel. Together, they create a package that encapsulates
                  both classic and delicate flavors.
                </li>
              </ul>
            </li>
          </ol>
          <p>
            {" "}
            Order now and elevate your dessert moments with our latest
            creations!
          </p>
        </div>
      </section>
      <section className="bg-[url('./patternBG1.svg')] bg-cover bg-left grid grid-cols-1 px-5 md:px-28 py-10 md:py-24 gap-20">
        <div className="flex flex-col">
          <div className="w-full md:w-1/3">
            <h2 className="font-bold text-5xl text-theme-red mb-5">
              Cozy Place
            </h2>
            <p>
              The interior is warm and comforting, making you feel comfortable
              to spend time alone or with friends
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="w-full md:w-1/3">
            <h2 className="font-bold text-5xl text-theme-red mb-5">
              Affordable
            </h2>
            <p>We adjusted our prices to cover a wider range of customers</p>
          </div>
        </div>
        <div className="flex flex-col items-end ">
          <div className="w-full md:w-1/3">
            <h2 className="font-bold text-5xl text-theme-red mb-5">
              Best Quality
            </h2>
            <p>
              Using natural ingredients and ensuring everything is freshly made
              is our priority
            </p>
          </div>
        </div>
      </section>
      <section className=" bg-theme-brown grid grid-cols-1 px-5 md:px-28 py-10 md:py-24 gap-10 text-center">
        <h2 className="font-bold text-3xl text-white">
          Join as our member to get all the benefits !
        </h2>
        <div>
          <LinkButton
            text={"Join Now !"}
            to={"/"}
            className={
              "bg-white text-theme-brown hover:border-2 hover:bg-theme-brown hover:text-white"
            }
          />
        </div>
      </section>
    </div>
  );
};
