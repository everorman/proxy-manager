import { TokenService } from "@loopback/authentication";
import { MyUserService, TokenServiceBindings, User, UserRepository, UserServiceBindings } from "@loopback/authentication-jwt";
import { inject } from "@loopback/core";
import { repository } from "@loopback/repository";
import { Credentials } from "../types";

export class AuthService{
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
  ){}

  async identify(credentials: Credentials): Promise<User | false>{
    let {email, password} = credentials;
    let user = await this.userRepository.findOne({where: {email}});
    if(user){
      // Se debe verificar el password 
      const checkPasword = await this.userService.verifyCredentials(credentials);
      if(checkPasword){
        return user;
      }
      
    }
    return false;
  }

  async generateToken(user: User){
    const userProfile = this.userService.convertToUserProfile(user);
    return this.jwtService.generateToken(userProfile);
  }
}