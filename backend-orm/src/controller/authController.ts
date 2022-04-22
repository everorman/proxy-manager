import { BaseEntity, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity";


export class AuthController extends BaseEntity {

  static register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, passwordRepeat } = req.body;
    const user = new User();
    const userRepository = getRepository(User);

    if (password !== passwordRepeat) {
      res.status(403).json({ code: -1, message: "Password and Confirm Password must be match" });
      return
    }

    const userEmailCheck = await userRepository.findOne(
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
      await userRepository.save(user);
    } catch (error) {
      res.status(409).send("User allready exist");
      return;
    }
    delete user.password
    res.status(200).json(user)
  }

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOne({ email: email });
      if (user && !user.isValidPasswword(password)) {
        res.status(401).send("Invalid password");
        return;
      }
      res.status(200).json({ accesToken: user.generateJWT(), expiresIn: process.env.JWT_EXPIRES_IN  });
    } catch (error) {
      res.status(401).send(error)
    }
  }


}
