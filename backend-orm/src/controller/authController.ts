import {BaseEntity, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { User } from "../entity";


export class AuthController extends BaseEntity{
  
  static  register = async ( req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body;
    const user = new User();
    const  userRepository = getRepository(User);
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = user.setPassword(password);
    try{
      await userRepository.save(user);
    }catch(error){
      res.status(409).send("User allready exist");
      return;
    }
    res.status(201).send("User created")
  }

  static login = async ( req: Request, res: Response) =>{
    const {email, password} = req.body;
    const  userRepository = getRepository(User);
    try{
      const user = await userRepository.findOne({email: email});
      if(user && !user.isValidPasswword(password)){
        res.status(401).send("Invalid password");
        return;
      }
      res.status(200).json({accesToken: user.generateJWT()});
    }catch(error){
      res.status(401).send(error)
    }
  }


}
