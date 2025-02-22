"use client";
import React from "react";
import Script from "next/script";
import Razorpay from "razorpay";
import { initiate } from "@/actions/useraction";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { donators } from "@/actions/donatersList";
import { useEffect } from "react";
import { getData2 } from "@/actions/dashboardAction";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import User from "@/models/User";
import connectDb from "@/db/connectDb";
import mongoose from "mongoose";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const sessionemail = session?.user?.email;
  const [donatorsList, setdonatorsList] = useState([]);
  const [mycoll, setmycoll] = useState(0);
  const [details, setdetails] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchDonators = async () => {
      try {
        const list = await donators(username);
        list.sort((a, b) => {
          if (a.amount > b.amount) {
            return -1;
          }
          if (a.amount < b.amount) {
            return 1;
          }
          return 0;
        });
        setdonatorsList(list); // Store globally in state
        let c = 0;
        for (const key in list) {
          c = c + list[key].amount;
        }
        setmycoll(c);
        const dupdetails = await getData2(username);
        setdetails(dupdetails[0]);
        if (searchParams.get("paymentdone") == "true") {
          toast("🦄 Payment done ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          router.push(`/${username}`);
        }
      } catch (error) {
        console.error("Error fetching donators:", error);
      }
    };
    fetchDonators();
  }, [username]);

  const [paymentForm, setpaymentForm] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    setpaymentForm(data);
  };

  const amount = `${paymentForm.amount * 100}`;
  const pay = async () => {
    const a = await initiate(amount, username, paymentForm);
    // await connectDb()
    const orderId = a.id;
    // const user=await User.findOne({username:username})
    var options = {
      key: await details.RazorpayId, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Bhikhari", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `http://localhost:3000/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: paymentForm.name, //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <>
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        
        {
          <div className="text-white">
            <div className="relative">
              <img
                src={`${details?.coverpic}`}
                className="h-[300px] w-full object-fill"
                alt=""
              />
              <img
                src={`${details?.profilepic}`}
                className="w-20 h-20  absolute -bottom-10 left-[47.4%] border-white border-2 rounded-full object-"
                alt=""
              />
            </div>
            <div className="mt-14">
              <div className="username flex justify-center font-bold">
                @{username}
              </div>
              <div className="username flex justify-center mt-2 text-slate-400">
                You can help this creator{" "}
              </div>
              <div className="username flex justify-center text-slate-400">
                Total Collections - {mycoll}
              </div>
            </div>
            <div className="flex justify-center gap-4 py-10">
              <div className="w-[500px] bg-gray-900 h-[310px] rounded-lg overflow-y-scroll">
                <div className="heading text-xl font-bold mt-7 ml-7">
                  Our Supporters
                </div>
                <ul className="ml-10 mt-4 pr-4">
                  {donatorsList.length == 0 ? (
                    <>Nothing to show </>
                  ) : (
                    donatorsList.map((value, index) => {
                      return (
                        <>
                          <li className="flex items-center mb-3" key={index}>
                            <img src="/avatar.gif" className="w-7 h-7" alt="" />
                            <div className="ml-4 text-slate-400 flex items-center ">
                              Mr {value.name} has donated him ₹{value.amount}{" "}
                              with a message {value.message}
                              {/* <div className="ml-1 text-white"></div>
                  <div></div> */}
                            </div>
                          </li>
                        </>
                      );
                    })
                  )}
                </ul>
              </div>
              <div className="w-[500px] bg-gray-900 h-[310px] rounded-lg pl-7">
                <div className="heading text-xl font-bold mt-7 ">
                  Make a Payment
                </div>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="bg-slate-600 rounded w-[400px] mt-4 pl-3 p-1"
                    placeholder="Enter Name"
                  />
                  <input
                    {...register("message", { required: true })}
                    type="text"
                    className="bg-slate-600 rounded w-[400px] mt-4 pl-3 p-1"
                    placeholder="Enter Message"
                  />
                  <input
                    {...register("amount", { required: true })}
                    type="text"
                    className="bg-slate-600 rounded w-[400px] mt-4 pl-3 p-1"
                    placeholder="Enter Amount"
                  />
                  <div className="amount flex gap-3">
                    <button
                      className="bg-slate-600 mt-2 px-2 rounded-md"
                      onClick={() => {
                        setValue("amount", 10);
                      }}
                    >
                      {" "}
                      ₹10
                    </button>
                    <button
                      className="bg-slate-600 mt-2 px-2 rounded-md"
                      onClick={() => {
                        setValue("amount", 50);
                      }}
                    >
                      {" "}
                      ₹50
                    </button>
                    <button
                      className="bg-slate-600 mt-2 px-2 rounded-md"
                      onClick={() => {
                        setValue("amount", 100);
                      }}
                    >
                      {" "}
                      ₹100
                    </button>
                  </div>
                  <div className="flex mt-3 "></div>
                  <button
                    id="dropdownHoverButton"
                    data-dropdown-toggle="dropdownHover"
                    data-dropdown-trigger="hover"
                    className=" w-[400px] flex justify-center text-white my-2 bg-blue-700 h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                    onClick={() => {
                      pay();
                    }}
                  >
                    Proceed To Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        }
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </>
    </>
  );
};

export default PaymentPage;
