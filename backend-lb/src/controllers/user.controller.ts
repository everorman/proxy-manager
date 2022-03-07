// Copyright IBM Corp. 2020. All Rights Reserved.

import { inject, service } from "@loopback/core";
import { repository } from "@loopback/repository";
import { HttpErrors, post, requestBody } from "@loopback/rest";
import { genSalt, hash } from "bcryptjs";
import { User } from "../models";
import { AuthService } from "../services/auth.service";
import { Credentials } from "../types";
import _ from 'lodash';
import { MyUserService, TokenServiceBindings, UserRepository, UserServiceBindings } from "@loopback/authentication-jwt";
import { TokenService } from "@loopback/authentication";
import {SecurityBindings, UserProfile} from '@loopback/security';

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
    @service(AuthService) protected authService: AuthService
  ) {}

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