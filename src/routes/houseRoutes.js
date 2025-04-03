import express from "express";
import { createHouse, createHouseOwner, getAllHouseByOwner, listHouses, listHousesByOwners } from "../controllers/houseController.js";

const houseRouter = express.Router();

houseRouter.post('/',createHouse);
houseRouter.get('/',listHouses);
houseRouter.get('/houseOwners',listHousesByOwners);
houseRouter.post('/houseOwners',createHouseOwner);
//houseRouter.get('/houseOwners',getAllHouseByOwner);


export default houseRouter;
