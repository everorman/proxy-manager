import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { User } from "../entity";


export class UserController {
    userRepository = getRepository(User);
    
    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

     async one(request: Request, response: Response, next: NextFunction) {
        this.userRepository = getRepository(User);
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        this.userRepository = getRepository(User);
        this.userRepository.save(request.body);
    }

     async remove(request: Request, response: Response, next: NextFunction) {
        this.userRepository = getRepository(User);
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

     profile = async (res: Response) => {
        const userId = res.res.jwtPayload.userId;
        console.log('userID', userId);
        this.userRepository = getRepository(User);
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) {
          return {code: 404, message: 'User not found'};
        }
        return user
      }

}