"use server"
import mongoose from "mongoose";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import React from "react";

export const donators=async (username)=>{
    await connectDb()
    const donators=await Payment.find({to_user:username,done:true})
    console.log(donators)
    return donators
}


