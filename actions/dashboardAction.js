"use server"
import mongoose from "mongoose";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import React from "react";

export const getData=async (sessionemail)=>{
    // console.log("current user is ")
    await connectDb()
    const currentUser=await User.find({email:sessionemail})
    return currentUser
}
export const getData2=async (username1)=>{
    // console.log("current user is ")
    await connectDb()
    const currentUser=await User.find({username:username1})
    return currentUser
}
export const DashboardAction=async (form,sessionemail)=>{
    await connectDb()
    const currentUser=await User.find({email:sessionemail})
    const oldusername=currentUser[0].username
    console.log(oldusername)
    if (oldusername!=form.username){
        let u=await User.findOne({email:currentUser.email})
        if (u){
            return {error:"username already exsist"}
        }
        await User.updateOne({email:sessionemail},form)
        console.log(oldusername)
        console.log(await Payment.find({to_user:oldusername}))
        await Payment.updateMany({to_user:oldusername},{$set:{to_user:form.username}})
        console.log("done")
    }
    else{
        console.log(form)
        await User.updateOne({email:sessionemail},form)
    }


}


