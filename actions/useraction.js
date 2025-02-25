"use server"
import mongoose from "mongoose";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import React from "react";
import Razorpay from "razorpay"



export const initiate=async (amount, to_username , paymentform)=>{
  const user1=await User.findOne({username:to_username})
  var instance = new Razorpay({
    key_id: await user1.RazorpayId,
    key_secret:await user1.RazorpaySecreat
  })
  
  await connectDb()
  var options = {
    amount: Number.parseInt(amount),
    currency:"INR"
  };
    let x= await instance.orders.create(options)
    await Payment.create({
        oid:x.id,
        amount:amount/100,
        to_user:to_username,
        name:paymentform.name,
        message:paymentform.message
    })
    
    
    return x
}


