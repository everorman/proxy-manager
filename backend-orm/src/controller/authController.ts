import { BaseEntity, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity";


export class AuthController extends BaseEntity {
  userRepository = getRepository(User);
  register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, passwordRepeat } = req.body;
    const user = new User();
   

    if (password !== passwordRepeat) {
      res.status(403).json({ code: -1, message: "Password and Confirm Password must be match" });
      return
    }

    const userEmailCheck = await this.userRepository.findOne(
      {
        where:
          { email: email }
      }
    );

    if(userEmailCheck){
      console.log(userEmailCheck)
      res.status(403).json({ code: -2, message: "User exist" });
      return
    }
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = user.setPassword(password);


    try {
      await this.userRepository.save(user);
    } catch (error) {
      res.status(409).send("User allready exist");
      return;
    }
    delete user.password
    res.status(200).json(user)
  }

  login = async (req: Request, res: Response) => {
    console.log(req.body)
    const { email, password } = req.body;
    
    try {
      const user = await this.userRepository.findOne({ email: email });
      console.log('user', user);
      if(!user){
        return {code: -2, message: "Invalid user"}
      }
      if (user && !(await user.isValidPasswword(password))) {
        return {code: -1, message: "Invalid password"}
      }
      return { code: 1, data: {accesToken: user.generateJWT(), expiresIn: process.env.JWT_EXPIRES_IN} };
    } catch (error) {
      return error;
    }
  }


}
