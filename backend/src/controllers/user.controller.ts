// Copyright IBM Corp. 2020. All Rights Reserved.

import { service } from "@loopback/core";
import { repository } from "@loopback/repository";
import { HttpErrors, post, requestBody } from "@loopback/rest";
import { genSalt, hash } from "bcryptjs";
import { User } from "../models";
import { AuthService } from "../services/auth.service";
import { Credentials } from "../types";
import _ from 'lodash';
import { UserRepository } from "@loopback/authentication-jwt";

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @service(AuthService) public authService: AuthService
  ) { }

  @post('/login', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async login(@requestBody() credentials: Credentials) {
    const user = await this.authService.identify(credentials);
    if (user) {
      const token = await this.authService.generateToken(user);
      return {
        data: user,
        token
      }
    }
    throw new HttpErrors[401]("User or pasword invalid.");
  }

  @post('/signup')
  async signUp(
    @requestBody() user: User
  ) {
    const password = await hash(user.password, await genSalt());
    user.password = password;
    const savedUser = await this.userRepository.create(
      _.omit(user),
    );

    await this.userRepository.userCredentials(savedUser.id).create({password});
    return {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
    } ;
  }
}