import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-2 pt-10 pb-5 px-3 items-center text-center text-white">
        <div className="font-bold text-3xl flex gap-2 justify-center items-center">Buy Me a Chai <span><img className="invertImg" src="/tea.gif" width={50} alt="" /></span></div>
        <p>A crowdfunding for creators. Get funded by ypur fans and followers. Start now!</p>
        <div>
          <Link href={"/login"}><button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button></Link>
        <Link href={"/about"}><button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-20"></div>
      <div className="text-white container mx-auto pb-32 pt-14">
        <h2 className="font-bold text-3xl text-center my-5">Your Fans can buy you a chai</h2>
        <div className="flex flex-col sm:flex-row gap-5 text-center justify-around">
          <div className="item space-y-2 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" width={80} src="/man.gif" alt="" />
            <p className="font-bold">Your Fans want to help</p>
            <p className=" text-center">Your fans are available for you</p>
          </div>
          <div className="item space-y-2 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" width={80} src="/coin.gif" alt="" />
            <p className="font-bold">Your Fans want to give money</p>
            <p className=" text-center">Your fans are available for giving money</p>
          </div>
          <div className="item space-y-2 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" width={80} src="/group.gif" alt="" />
            <p className="font-bold">Your Fans want to help</p>
            <p className=" text-center">Your fans are available for you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-20"></div>
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col justify-center items-center">
        <h2 className="font-bold text-3xl text-center my-5">Learn More About Us</h2>
        <div className="w-[90%] h-[50vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

        </div>
      </div>
    </>
  );
}
