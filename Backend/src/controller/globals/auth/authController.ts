import { Request, Response } from "express";
import user from "../../../database/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../../../../config/config";

// functional based approach
// const registerUser = async (req:Request,res:Response) =>{
//   const {username,password,email} = req.body;
//   if(!username || !password || !email){
//     res.status(400).json({
//       message : "please provide username password or email"
//     })
//   }
//   return
//   await user.create({
//     username,
//     password,
//     email
//   })
//   res.status(200).json({
//     message : "user registered successfully"
//   })
// }

// class based or oop approach
class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        res.status(400).json({
          message: "please provide username password or email",
        });
        return;
      }
      const normalizedEmail = email.toLowerCase().trim();
      const existingUser = await user.findOne({
        where: {
          email: normalizedEmail,
        },
      });
      if (existingUser) {
        res.status(409).json({
          message: "user already registered",
        });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      await user.create({
        username,
        password: hashedPassword,
        email: normalizedEmail,
      });
      res.status(201).json({
        message: "user registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "server failed",
        error,
      });
    }
  }
  //login user
  static async loginUser(req: Request, res: Response) {
    try {
      const { password, email } = req.body;
      if (!email || !password) {
        res.status(400).json({
          message: "provide email and password",
        });
        return;
      }
      const normalizedEmail = email.toLowerCase().trim();
      const existingUser = await user.findAll({
        where: {
          email: normalizedEmail,
        },
      });
      if (existingUser.length == 0) {
        res.status(404).json({
          message: "User not registered",
        });
        return;
      }
      const isPassword = await bcrypt.compare(
        password,
        existingUser[0].password
      );
      if (isPassword) {
        const token = jwt.sign(
          { id: existingUser[0].id },
          envConfig.jwt_secretKey,
          {
            expiresIn: "30d",
          }
        );
        res.status(200).json({
          message: "login Successful",
          token,
        });
        return;
      }
      res.status(401).json({
        message: "email or password didn't match",
      });
    } catch (error) {
      res.status(500).json({
        message: "server error",
        error,
      });
    }
  }
}

export default AuthController;
