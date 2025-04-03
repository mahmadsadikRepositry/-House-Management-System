import mongoose from "mongoose";
const houseOwnerSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId, ref: "Owner" },
    house: { type: mongoose.Types.ObjectId, ref: "House" },
  },
  {
    //toJSON.transform() method modifies the JSON output of documents before sending them to the API response.
    // toJSON: {
    //   transform: function (doc, ret) {
    //     // Deletes _id and __v fields, so they will not be returned in API responses.
    //     delete ret._id; // Remove _id field from API responses
    //     delete ret.__v; // Remove __v (Mongoose version key)
    //   },
    // },
  }
);

const HouseOwner = mongoose.model("HouseOwner", houseOwnerSchema);
export default HouseOwner;
