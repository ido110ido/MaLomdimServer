import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();
exports.adminVerify = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res?.status(400).json({ message: "no verify found" });
    }
    try {
      const user = jwt.verify(token, process.env.TOKEN_KEY as string) as {
        userType: string;
      };
      if (user.userType === role) {
        next();
      } else {
        return res
          .status(401)
          .json({ message: "You are not authorized to perform this action." });
      }
    } catch (error) {
      return res
        .status(401)
        .json({ message: "You are not authorized to perform this action." });
    }
  };
};
