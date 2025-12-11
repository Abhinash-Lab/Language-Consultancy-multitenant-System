import { Request, Response } from "express";
import user from "../../../database/models/user.model";


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
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(400).json({
        message: "please provide username password or email",
      });
      return;
    }

    await user.create({
      username,
      password,
      email,
    });
    res.status(200).json({
      message: "user registered successfully",
    });
  }
}

export default AuthController;
