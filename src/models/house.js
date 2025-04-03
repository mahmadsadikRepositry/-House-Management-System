import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Owner from "./owner.js";

const houseSchema = new mongoose.Schema({
  // house_id: {
  //   type: String,
  //   default: uuidv4,
  //   unique: true,
  // },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
    minlength: 5,
    maxlength:5
  },
  houseStatus:{
    type: String,
    required: true,
  }
  // owner:[{
  //     type: mongoose.Types.ObjectId, //Using Default ObjectID
  //     ref: 'Owner' //One to Many
  // }]
  //   owner:{
  //     type: mongoose.Types.ObjectId, //Using Default ObjectID
  //     ref: 'Owner' //One to One
  // }
});

function validator(value){
  console.log("Value",value);
  return ["Sold","Hold"].includes(value)
}

const House = mongoose.model("House", houseSchema);

export default House;
