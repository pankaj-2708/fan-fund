"use server";
import mongoose from "mongoose";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import React from "react";
import fs from "fs"
import path from "path";
import sharp from "sharp";


// for fetching data by email
export const getData = async (sessionemail) => {
  await connectDb();
  const currentUser = await User.find({ email: sessionemail });
  return currentUser;
};

// for fetching data by username

export const getData2 = async (username1) => {
  await connectDb();
  const currentUser = await User.find({ username: username1 });
  return currentUser;
};


// for upadating profile pic
export const updateProfilePic = async (username, selectedImage) => {
  console.log("Profile picture updated successfully:");
  

  const fileBuffer = await selectedImage.arrayBuffer(); // Convert File to Buffer
    const buffer = Buffer.from(fileBuffer,"base64");


    //for compressing image 


    // const optimizedImage = await sharp(buffer)
    // .resize({ width: 80 }) // Resize to 800px width (adjust as needed)
    // .jpeg({ quality: 70 }) // Reduce quality to 70% (adjust for balance)
    // .toBuffer();

    // Define the new file path
    const newFilePath = path.join(process.cwd(), "public", `${username}.png`);

    // Write the buffer to a new file
    fs.writeFileSync(newFilePath, buffer);

  };


  // for updating cover profile pic

  export const updateCoverPic = async (username, selectedImage) => {
    
    
    const fileBuffer = await selectedImage.arrayBuffer(); // Convert File to Buffer
    const buffer = Buffer.from(fileBuffer);
    
    // Define the new file path
    const newFilePath = path.join(process.cwd(), "public", `${username}cover.png`);
    
    // Write the buffer to a new file
    fs.writeFileSync(newFilePath, buffer);
    // console.log("Cover picture updated successfully:", newFilePath);

};


// for deleting profile file

export const handledelete = async (username) => {
    const newFilePath = path.join(process.cwd(), "public", `${username}.png`);
    fs.unlinkSync(newFilePath)
    // console.log("File deleted successfully:", filePath);
};


export const handledeleteCover = async (username) => {
    const newFilePath = path.join(process.cwd(), "public", `${username}cover.png`);
    fs.unlinkSync(newFilePath)
};



// for handling deleing of cover file

export const DashboardAction = async (form, sessionemail) => {
  await connectDb();
  const currentUser = await User.find({ email: sessionemail });
  const oldusername = currentUser[0].username;

  if (oldusername != form.username) {
    let u = await User.findOne({ email: currentUser.email });
    if (u) {
      return { error: "username already exsist" };
    }
    await User.updateOne({ email: sessionemail }, form);

    await Payment.updateMany(
      { to_user: oldusername },
      { $set: { to_user: form.username } }
    );
  } else {
    await User.updateOne({ email: sessionemail }, form);
  }
};
