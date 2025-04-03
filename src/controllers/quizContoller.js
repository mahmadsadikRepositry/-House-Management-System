import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv();

export const getQuestions = async (req, res) => {
  try {
    const questionsResponse = await axios.get(
      process.env.POLYGON_URL,
    {
        headers:{
            Authorization: `Bearer ${process.env.PLOYGON_API_KEY}`
        }
    });

    console.log("questionsResponse", questionsResponse.data);

    res.status(200).json(questionsResponse.data);

  } catch (error) {
    console.error(error);
  }
};
