import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import React from "react";

export const POST = async (req) => {
  await connectDb();
  let body = await req.formData();
  body = Object.fromEntries(body);
  let p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ sucess: false, message: "order id not found" });
  }
  const use=await Payment.findOne({oid:body.razorpay_order_id })
  const user=await User.findOne({username:use.to_user })
  console.log("fucking user is ",await user)
  console.log("fucking userrazorpay id is ",await user.RazorpaySecreat)
  const xx = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    await user.RazorpaySecreat
  );
  if (xx) {
    console.log("hello");
    let user1 = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { $set: { done: "true" } },
        { new: true } // This ensures the updated document is returned
      );
      
    return NextResponse.redirect(`http://localhost:3000/${user1.to_user}?paymentdone=true`);
  } else {
    return NextResponse.json({
      sucess: false,
      message: "Payment Verification Failed",
    });
  }
};
