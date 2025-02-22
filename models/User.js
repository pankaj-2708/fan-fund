import mongoose from "mongoose";
const { Schema, model } = mongoose;


const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  username: { type: String, required: true },
  profilepic: { type: String },
  coverpic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  RazorpayId:{ type:String },
  RazorpaySecreat:{ type:String}
});


export default mongoose.models?.User || model("User", UserSchema);;
