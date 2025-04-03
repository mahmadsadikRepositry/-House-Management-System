import House from '../models/house.js';
import HouseOwner from '../models/houseOwner.js';

// Create a new house
export const createHouse = async (req, res) => {
    const { ...houseData } = req.body;
    // const { ownerId, ...houseData } = req.body;
    try {
        const house = new House({ ...houseData });
        //const house = new House({ ...houseData, owner: ownerId });
        const savedHouse = await house.save();
        res.status(201).json(savedHouse);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};


// Get all houses information populated
export const listHouses = async (req, res) => {
    try {
        const houses = await House.find();
        res.status(200).json(houses);
    } catch (err) {
        res.status(400).json(err);
    }
};

// using populate $lookup => Get all houses with owner information populated
//https://www.mongodb.com/docs/manual/aggregation/
export const listHousesByOwners = async (req, res) => {
    try {
        const houses = await House.aggregate([
            {
                $lookup: {
                    from: "houseOwners",  // Collection storing owner-house relationships
                    localField: "_id",  // Field in House collection
                    foreignField: "owner",  // Matching field in HouseOwner collection
                    as: "houseOwners"  // Output field containing matched relationships
                }
            },
            // Stage 2: Filter out houses with no owners
            // {
            //     $match: {
            //         "houseOwners.0": { $exists: true }  // Ensures only houses with at least one owner are included
            //     }
            // },

            // {
            //     $project:{
            //         "houseOwners.house": 0,
            //         "houseOwners._id": 0
            //     }
            // }
          ])
        console.log("houses",houses);

        res.status(200).json(houses);
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
};

//using populate => Get all houses with owner information populated
// https://mongoosejs.com/docs/populate.html
// export const listHousesByOwners = async (req, res) => {
//     try {
//         const houses = await House.find().populate('owner')

//         res.status(200).json(houses);
//     } catch (err) {
//         console.error(err)
//         res.status(400).json(err);
//     }
// };


// Create a new house-owner relationship
export const createHouseOwner = async (req, res) => {
    const { ownerId, houseId } = req.body;
    try {
        const newHouseOwner = new HouseOwner({ owner: ownerId, house: houseId });
        const savedHouseOwner = await newHouseOwner.save();
        res.status(201).json(savedHouseOwner);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get all houses for an owner
export const getAllHouseByOwner =  async (req, res) => {
    try {
        const houseWithOwnerDetails = await HouseOwner.find().populate('house').populate('owner');
        console.log("houseWithOwnerDetails",houseWithOwnerDetails);
        res.status(200).json(houseWithOwnerDetails);

    } catch (err) {
        res.status(400).json(err);
    }
};

// Get all owners for a house
export const getAllOwnersByHouse =  async (req, res) => {
    try {
        
        res.status(200).json(houseOwners);
    } catch (err) {
        res.status(400).json(err);
    }
};
