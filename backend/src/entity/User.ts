import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Site } from "./Site";
import { Proxy } from "./Proxy";
import config from "../config/config";

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    type: "set",
    enum: UserRole,
    default: [UserRole.USER],
  })
  roles: UserRole[]

  @OneToMany(type => Site, site => site.user) sites: Site[];

  @OneToMany(type => Proxy, proxy => proxy.user) proxies: Proxy[];

  isValidPasswword = async (pws: string) => {
    const result = await bcrypt.compare(pws, this.password);
    return result;
  }

  setPassword = (password: string) => {
    return (this.password = bcrypt.hashSync(password, 8));
  }

  generateJWT = () => {
    return jwt.sign(
      {
        userId: this.id,
        email: this.email
      },
      config.jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )
  }

}
