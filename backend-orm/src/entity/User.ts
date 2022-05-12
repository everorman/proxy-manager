import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Site } from "./Site";
import config from "../config/config";

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

  @OneToMany(type => Site, site => site.user) sites: Site[]; 

   isValidPasswword = async (pws: string) =>{
    const result = await bcrypt.compare(pws, this.password);
    console.log('Password correctas ', result);
    return result;
  }

  setPassword = (password: string) => {
    return (this.password = bcrypt.hashSync(password, 8));
  }

  generateJWT = () => {
    return jwt.sign(
      {
        id: this.id,
        email: this.email
      },
      config.jwtSecret,
      {expiresIn: process.env.JWT_EXPIRES_IN}
    )
  }

}
