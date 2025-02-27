"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { DashboardAction } from "@/actions/dashboardAction";
import { getData } from "@/actions/dashboardAction";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const { data: session } = useSession();
  if (!session) {
    const router = useRouter();
    router.push("/login");
  }
  const sessionemail = session?.user.email;
  const onSubmit = (data) => {
    console.log(data);
    DashboardAction(data, sessionemail);
    a();
    toast("🦄 Profile Updated", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const a = async () => {
    const data = await getData(sessionemail);
    setValue("username", data[0].username);
    setValue("name", data[0].name);
    setValue("email", data[0].email);
    setValue("profilepic", data[0].profilepic);
    setValue("coverpic", data[0].coverpic);
    console.log(data);
    setValue("RazorpayId", data[0].RazorpayId);
    setValue("RazorpaySecreat", data[0].RazorpaySecreat);
    console.log(data[0]);
  };
  useEffect(() => {
    a();
  }, []);

  return (
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
      <div className="text-white pt-10 ">
        <div className="heading sm:text-5xl text-4xl font-bold text-center flex justify-center pb-5">
          Welcome to your Dashboard
        </div>
        <div className="w-full mt-1 flex items-center justify-center">
          <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-3 ">
                <div className="">Name</div>
                <input
                  type="text"
                  {...register("name")}
                  className="pl-2 sm:sm:w-[500px] bg-gray-600 rounded-md"
                />
              </div>

              <div className="mt-3 ">
                <div className="">Username</div>
                <input
                  type="text"
                  {...register("username")}
                  className="pl-2 sm:w-[500px] bg-gray-600 rounded-md"
                />
              </div>
              <div className="mt-3 ">
                <div className="">Email</div>
                <input
                  type="text"
                  {...register("email")}
                  className="pl-2 sm:w-[500px] bg-gray-600 rounded-md"
                />
              </div>
              
              <div className="mt-3 ">
                <div className="">Razorpay Id</div>
                <input
                  type="text"
                  {...register("RazorpayId")}
                  className="pl-2 sm:w-[500px] bg-gray-600 rounded-md"
                />
              </div>
              <div className="mt-3 ">
                <div className="">Razorpay Secreat</div>
                <input
                  type="text"
                  {...register("RazorpaySecreat")}
                  className="pl-2 sm:w-[500px] bg-gray-600 rounded-md"
                />
              </div>
              <div className="mt-8 sm:mt-4  sm:w-[500px] sm:block flex justify-center sm:pb-2">
                <button
                  type="submit"
                  className="text-white sm:w-[500px] h-8 sm:h-10 pt-1 sm:scale-100 scale-150 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5  text-center me-2 mb-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
