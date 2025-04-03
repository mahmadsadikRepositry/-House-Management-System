import express from "express";
import { createOwner, getOwners } from "../controllers/ownerController.js";

const ownerRouter = express.Router();

ownerRouter.post('/',createOwner);
ownerRouter.get('/',getOwners);

export default ownerRouter;
