
import Owner from '../models/owner.js';

// Create a new owner
export const createOwner = async (req, res) => {
    const newOwner = new Owner(req.body);
    try {
        const savedOwner = await newOwner.save();
        res.status(201).json(savedOwner);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get all owners
export const getOwners =  async (req, res) => {
    try {
        const owners = await Owner.find();
        res.status(200).json(owners);
    } catch (err) {
        res.status(400).json(err);
    }
};

