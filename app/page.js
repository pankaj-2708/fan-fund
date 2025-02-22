import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <div className="pt-20 text-center text-white">
        <div className=" flex items-center justify-center gap-4">
          <div className="text-5xl  font-bold ">Buy me a Chai</div>
          <div className="image w-20 h-20">
            <img src="/tea.gif" alt="fucked" />
          </div>
        </div>
        <div className="mt-8">
          A crowdfunding platform for creators . Get funded by your fans and
          follwers. Start Now!
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start here
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="w-full h-1 mt-10 opacity-10 bg-white"></div>
      <div className="my-14">
        <div className="lowehalf pt-5 text-center text-white font-bold text-xl">
          Your fans ban buy you a Chai
        </div>
        <div className="flex justify-around text-white mt-4">
          <div className="box">
            <div className="flex justify-center">
              <img
                src="/man.gif"
                className="w-20 h-20 rounded-full bg-gray-400"
                alt="gif"
              />
            </div>
            <div className="text-center font-bold ">Fans want to help</div>
            <div className="text-xs">Your fans are available for you</div>
          </div>
          <div className="box">
            <div className="flex justify-center">
              <img
                src="/coin.gif"
                className="w-20 h-20 rounded-full bg-gray-400"
                alt="gif"
              />
            </div>
            <div className="text-center font-bold ">Fans want to help</div>
            <div className="text-xs">Your fans are available for you</div>
          </div>
          <div className="box">
            <div className="flex justify-center">
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
        <div className="lowehalf pt-5 text-center text-white font-bold text-xl">
          Learn more about us
        </div>
        <div className="flex justify-center pt-10">
          <iframe
            width="450"
            height="300"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
