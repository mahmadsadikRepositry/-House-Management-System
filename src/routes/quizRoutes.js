import express from "express";
import { getQuestions } from "../controllers/quizContoller.js";

const quizRouter = express.Router();

quizRouter.get('/questions',getQuestions);

export default quizRouter;