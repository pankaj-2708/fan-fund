import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="pt-20 text-center text-white px-1 ">
        <div className=" flex items-center justify-center sm:gap-4">
          <div className="text-7xl  font-bold ">Fan Fund</div>
        </div>
        <div className="mt-8">
          A crowdfunding platform for creators . Get funded by your fans and
          follwers. Start Now!
        </div>
        <div className="mt-4 sm:flex justify-center ">
          <div>

          <Link href="/login">
          <button
            type="button"
            className="text-white sm:scale-100 scale-150 sm:mb-2 mb-8 mt-8 sm:mt-0 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
            >
            Start here
          </button>
            </Link>
              </div>
              <div>

            <Link href="/About">
          <button
            type="button"
            className="text-white  sm:scale-100 scale-150 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
            Read More
          </button>
            </Link>
              </div>
        </div>
      </div>
      <div className="w-full h-1 mt-10 opacity-10 bg-white "></div>
      <div className="my-14">
        <div className="lowehalf sm:pt-    sm:pb-5 pb-10 text-center text-white font-bold text-3xl ">
          Your fans can  Raise Fund for you
        </div>
        <div className="sm:flex justify-around text-white mt-4 text-center ">
          <div className="box sm:mb-0 my-8 sm:scale-100 scale-150 ">
            <div className="flex justify-center sm:mb-0 mb-4">
              <img
                src="/man.gif"
                className="w-20 h-20 rounded-full bg-gray-400"
                alt="gif"
              />
            </div>
            <div className="text-center font-bold ">Fans want to help</div>
            <div className="text-xs">Your fans are available for you</div>
          </div>
              <div className="w-full h-1 mt-20 sm:hidden  opacity-10 bg-white"></div>
          <div className="box sm:mb-0 sm:my-8 my-20 sm:scale-100 scale-150">
            <div className="flex justify-center sm:mb-0 mb-4">
              <img
                src="/coin.gif"
                className="w-20 h-20 rounded-full bg-gray-400"
                alt="gif"
              />
            </div>
            <div className="text-center font-bold ">Fans want to help</div>
            <div className="text-xs">Your fans are available for you</div>
          </div>
              <div className="w-full h-1 mt-7 sm:hidden opacity-10 bg-white"></div>
          <div className="box sm:mb-0 sm:my-8 my-20 sm:scale-100 scale-150">
            <div className="flex justify-center sm:mb-0 mb-4">
              <img
                src="/group.gif"
                className="w-20 h-20 rounded-full bg-gray-400"
                alt="gif"
              />
            </div>
            <div className="text-center font-bold ">Fans want to help</div>
            <div className="text-xs">Your fans are available for you</div>
          </div>
        </div>
      </div>
      <div className="w-full h-1 mt-7 opacity-10 bg-white"></div>
      <div className="py-10 ">
        <div className="lowehalf sm:pt-5 text-center text-white font-bold text-3xl">
          Learn more about us
        </div>
        <div className="flex justify-center pt-10 ">
          <iframe
            className="sm:w-[450px] sm:h-[250px]"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
