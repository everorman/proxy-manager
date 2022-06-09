import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User, UserRole } from "../entity/User";


export const checkRole = (roles: Array<UserRole>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    for (const role of roles) {
      if (user.roles.indexOf(role)) next();
    }

    res.status(401).send();
  };
};