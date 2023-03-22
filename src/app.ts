import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./index";
import { connectToDB } from "./connection";
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
connectToDB();
app.listen(process.env.PORT, () =>
  console.log(`Listening on http://localhost:${process.env.PORT}`)
);
