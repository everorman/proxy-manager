import { getRepository, Like } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User, UserRole } from "../entity";


export class UserController {
  userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async search(request: Request, response: Response, next: NextFunction) {
    const { key } = request.params;
    let where = {};
    if (key) {
      where = { email: Like(`%${key}%`) };
    }
    const result = await this.userRepository.find({
      select: ['id', 'email', 'firstName', 'lastName'],
      where,
      take: 5,
    });
    return result;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    this.userRepository = getRepository(User);
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    this.userRepository = getRepository(User);
    const { user } = request.body;
    user.roles = [UserRole.USER];
    this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    this.userRepository = getRepository(User);
    let userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }

  profile = async (res: Response) => {
    const userId = res.res.jwtPayload.userId;
    this.userRepository = getRepository(User);
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      return { code: 404, message: 'User not found' };
    }
    return user
  }

}