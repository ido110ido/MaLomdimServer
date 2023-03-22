// a simple connection to mongoDB using Mongoose
import { connect } from "mongoose";
require("dotenv").config();
// connection to local mongoDB
const uri = process.env.TOKEN_SECRET;
// a connection will usually be to a remote cloud one using
// a connection string const uri:

// "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
// name of db i want to connect to
const dbName = "/MaLomdim";
export const connectToDB = async () => {
  try {
    await connect(`${uri}${dbName}`);
    console.log("db connected");
  } catch (err) {
    console.log("error connecting to db", err);
  }
};
