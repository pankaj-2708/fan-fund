"use client";
import React from "react";
import Script from "next/script";
import Razorpay from "razorpay";
import { initiate } from "@/actions/useraction";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { donators } from "@/actions/donatersList";
import { useEffect } from "react";
import { getData2 } from "@/actions/dashboardAction";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { handledelete } from "@/actions/dashboardAction";
import { handledeleteCover } from "@/actions/dashboardAction";
import { updateCoverPic } from "@/actions/dashboardAction";
import { updateProfilePic } from "@/actions/dashboardAction";
import { setInterval, setTimeout } from "timers";




const PaymentPage = ({ username }) => {
  const [donatorsList, setdonatorsList] = useState([]);
  const [EditImage, setEditImage] = useState(false);
  const [details, setdetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setloading] = useState(false);
  const [uploadingState, setuploadingState] = useState("")
  const [paymentForm, setpaymentForm] = useState({});
  let [mycoll, setmycoll] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const sessionemail = session?.user?.email;
  const fileInputRef = useRef(null);
  const fileInputCoverRef = useRef(null);
  const editImageref = useRef(null);
  const uploadingRef = useRef();
  
  
  // importing form requirements 
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      setValue,
    } = useForm();
    const onSubmit = (data) => {
      setpaymentForm(data);
    };



  // for handling changes image taken as input from the user

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };


  //for displaying a loading screen until file is uploaded in server

  const handleUploadChange=()=>{
    const uploading = [".", "..", "..."];
    let i=0
      setInterval(() => {
        setuploadingState(uploading[i%3]);
        i += 1;
      }, 500);
    }
  

  // for updating cover Image

  const handleCoverImageChange = async (event) => {
    const file = event.target.files?.[0];
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return alert("file size must be less than 2 mb");
    }
    await updateCoverPic(username, file);
    toast("🦄 Cover Photo Updated ", {
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
    window.location.reload();
  };


  // for updating profile picture

  const handleUpload = async () => {
    const maxSize = 10 * 1024 * 1024;
    if (imageFile.size > maxSize) {
      return alert("file size must be less than 2 mb");
    }
    setloading(true);
    handleUploadChange()
    await updateProfilePic(username, imageFile);
    setloading(false);

    toast("🦄 Profile Photo Updated ", {
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

    window.location.reload();
  };


  // for fetching details of peoples who have donated till now to this particular user 

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


      // displaying toast if payment is done 

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


  // displaying user who supported this user till now


  useEffect(() => {
    fetchDonators();
  }, [username]);



  const amount = `${paymentForm.amount * 100}`;

  // handling pay button
  const pay = async () => {
    const a = await initiate(amount, username, paymentForm);
    const orderId = a.id;


    // razorpay setup
    var options = {
      key: await details.RazorpayId, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Fan Fund", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `http://localhost:3000/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: paymentForm.name, //your customer's name
        email: "",
        contact: "", //Provide the customer's phone number for better conversion rates
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

  // converting total collection to indian system
  mycoll = Intl.NumberFormat("en-IN").format(mycoll);
  
  
  return (
    <>
      <>
        <div className="realtive ">
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
            <div className={`text-white `}>


              {/* cover image */}


              <div className="relative ">
                <img
                  src={`/${details.username}cover.png`}
                  className={`sm:h-[300px] h-[300px] w-full object-fill ${
                    !EditImage ? "opacity-100" : "opacity-10"
                  }`}
                  alt=""
                />

                {/* taking cover image as input  */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputCoverRef}
                  onChange={handleCoverImageChange}
                  className="hidden"
                />

                {/* for editing cover image */}
                <img
                  src="edit.gif"
                  className={`absolute edit  bottom-[10px] right-[10px] w-7 h-7 invert ${
                    !EditImage ? "opacity-100" : "opacity-10"
                  }  ${session?.user.email == details.email ? "" : "hidden"}`}
                  onClick={() => {
                    fileInputCoverRef.current?.click();
                  }}
                  alt=""
                />

                {/* for deleting cover image  */}
                
                <img
                  src="delete.gif"
                  className={`absolute bottom-[10px] right-[40px] w-7 h-7 invert ${
                    !EditImage ? "opacity-100" : "opacity-10"
                  }  ${session?.user.email == details.email ? "" : "hidden"}`}
                  onClick={() => {
                    handledeleteCover(username);
                    window.location.reload();
                  }}
                  alt=""
                />


                {/* profile pic */}


                <img
                  src={`/${details.username}.png`}
                  className={`w-20 h-20  absolute ${
                    !EditImage ? "opacity-100" : "opacity-10"
                  } -bottom-10 sm:left-[47.4%] left-[40%] border-white border-2 rounded-full object-`}
                  alt=""
                  onClick={() => {
                    if (session.user.email == details.email) {
                    setEditImage(true);
                    }
                  }}
                />


                {/* image editor component  */}


                <div className=" flex justify-center items-center">
                  <div
                    className={`editimage  absolute z-10  w-[300px] ${
                      EditImage ? "" : "hidden"
                    }  ${
                      selectedImage == null ? "" : "hidden"
                    } text-black sm:min-w-[300px] min-h-[90px] rounded-lg flex-col justify-center items-center bg-blue-300`}
                    ref={editImageref}
                  >


                    <div className="mr-2 font-bold text-xl flex justify-around items-center mt-2">
                      <img
                        src="https://img.icons8.com/?size=100&id=79023&format=png&color=000000"
                        className="w-7 h-7"
                        alt=""
                        onClick={() => {
                          setEditImage(false);
                        }}
                      />


                      <div className="font-bold text-xl">
                        {" "}
                        Fan Fund Account{" "}
                      </div>


                    </div>

                    
                    <div className="profilepic flex justify-center mt-4">
                      <img
                        src={`/${details.username}.png`}
                        className={`w-[150px] h-[150px]  absolute-bottom-10 sm:left-[47.4%] left-[40%] border-white border-2 rounded-full object-`}
                        alt=""
                      />
                    </div>


                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                    />


                    <div className="buttons flex sm:justify-between justify-center items-center px-4 gap-2 mb-2 mt-3 ">
                      <button
                        className="flex rounded-3xl justify-center sm:ml-0  sm:mb-0 mb-2 text-white my-2 bg-blue-700 h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium text-sm  px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[150px] mr-0"
                        onClick={() => {
                          fileInputRef.current?.click();
                        }}
                      >
                        Change
                      </button>
                      <button
                        className="flex rounded-3xl justify-center sm:ml-0  sm:mb-0 mb-2 text-white my-2 bg-blue-700 h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium text-sm  px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[150px]"
                        onClick={() => {
                          handledelete(username);
                          window.location.reload();
                        }}
                      >
                        Remove
                      </button>


                    </div>
                  </div>
                </div>
              </div>


              {/* for saving image */}

              
              {selectedImage && (
                <>
                  <div className="flex justify-center items-center">
                    <div
                      className={`editimage  absolute z-10  ${
                        EditImage ? "opacity-100" : "opacity-0"
                      }   text-black sm:min-w-[300px] w-[300px] min-h-[90px] rounded-lg flex-col justify-center items-center bg-blue-300`}
                    >
                      <div className="mr-2 font-bold text-xl flex justify-around items-center mt-2">
                        <img
                          src="https://img.icons8.com/?size=100&id=79023&format=png&color=000000"
                          className="w-7 h-7"
                          alt=""
                          onClick={() => {
                            setEditImage(false);
                          }}
                        />
                        <div className="font-bold text-xl">
                          {" "}
                          Fan Fund Account{" "}
                        </div>
                      </div>
                      <div className="profilepic flex justify-center mt-4">
                        <img
                          src={`${selectedImage}`}
                          className={`w-[150px] h-[150px]  absolute-bottom-10 sm:left-[47.4%] left-[40%] border-white border-2 rounded-full object-`}
                          alt=""
                        />
                      </div>
                      <div
                        className={`flex justify-center items-center mt-3 ${
                          loading ? "" : "hidden"
                        } text-white`}
                        ref={uploadingRef}
                      >
                        Uploading{uploadingState}
                      </div>
                      <div className="buttons flex justify-between px-1 gap-2  mt-2 ">
                        <button
                          className="flex rounded-3xl justify-center sm:ml-0  mb-2 text-white my-2 bg-blue-700 h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium text-sm  px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[150px]"
                          onClick={handleUpload}
                        >
                          Save
                        </button>
                        <button
                          className="flex rounded-3xl justify-center sm:ml-0   mb-2 text-white my-2 bg-blue-700 h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium text-sm  px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[150px]"
                          onClick={() => {
                            setEditImage(false);
                            setSelectedImage(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}


              {/* details of user */}


              <div
                className={`mt-14 ${!EditImage ? "opacity-100" : "opacity-10"}`}
              >
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

              
              {/* showing details of user who had supported  */}
              
              <div
                className={`${
                  !EditImage ? "opacity-100" : "opacity-10"
                } sm:flex sm:justify-center gap-4 py-10 px-7 flex-col sm:flex-row `}
              >
                <div className="sm:w-[500px] w-[300px] bg-gray-900 h-[310px] rounded-lg overflow-y-scroll sm:order-1 order-2 ">
                  <div className="heading text-xl font-bold sm:mt-7 mt-5 sm:ml-7 ml-5 text-center sm:text-left sm:pr-0 pr-5">
                    Our Supporters
                  </div>
                  <ul className="sm:ml-10 ml-5 mt-4 sm:pr-4 pr-4" key={donatorsList.length}>
                    {donatorsList.length == 0 ? (
                      <>Nothing to show </>
                    ) : (
                      donatorsList.map((value, index) => {
                        return (
                          
                            <li className="flex items-center mb-3" key={index}>
                              <img
                                src="/avatar.gif"
                                className="w-7 h-7"
                                alt=""
                              />
                              <div className="ml-4 text-slate-400 flex items-center ">
                                Mr {value.name} has donated him ₹
                                {Intl.NumberFormat("en-IN").format(
                                  value.amount
                                )}{" "}
                                with a message {value.message}
                              </div>
                            </li>
                        
                        );
                      })
                    )}
                  </ul>
                </div>



                {/* for making payments  */}

                
                <div className="sm:w-[500px] bg-gray-900 sm:h-[310px] rounded-lg pl-7 sm:py-0 py-1 mt-8 sm:mt-0 sm:order-2 order-1">
                  <div className="heading text-xl font-bold sm:mt-7 mt-3 ">
                    Make a Payment
                  </div>
                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      className="bg-slate-600 rounded sm:w-[400px] mt-4 pl-3 p-1"
                      placeholder="Enter Name"
                    />
                    <input
                      {...register("message", { required: true })}
                      type="text"
                      className="bg-slate-600 rounded sm:w-[400px] mt-4 pl-3 p-1"
                      placeholder="Enter Message"
                    />
                    <input
                      {...register("amount", { required: true })}
                      type="text"
                      className="bg-slate-600 rounded sm:w-[400px] mt-4 pl-3 p-1"
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
                      className=" sm:w-[400px] flex justify-center sm:ml-0 ml-10 sm:mb-0 mb-2 text-white my-2 bg-blue-700 h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm  px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        </div>

        
        {/* razorpay requirment */}

        
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </>
    </>
  );
};

export default PaymentPage;