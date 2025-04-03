import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const ownerSchema = new mongoose.Schema(
  {
    // owner_id: {
    //   type: String,
    //   default: uuidv4,
    //   unique: true,
    // },
    name: String,
  },
  // {
  //   //toJSON.transform() method modifies the JSON output of documents before sending them to the API response.
  //   toJSON: {
  //     transform: function (doc, ret) {
  //       // Deletes _id and __v fields, so they will not be returned in API responses.
  //       delete ret._id; // Remove _id field from API responses
  //       delete ret.__v; // Remove __v (Mongoose version key)
  //     },
  //   },
  // }
);

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
