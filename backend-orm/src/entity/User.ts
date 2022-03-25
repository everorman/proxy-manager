import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

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

  isValidPasswword = (pws: string) =>{
    return bcrypt.compare(pws, this.password)
  }

  setPassword = (password: string) => {
    return (this.password = bcrypt.hashSync(password, 8));
  }

  generateJWT = () => {
    return jwt.sign(
      {
        email: this.email,
      },
      "SECRET",
      {expiresIn: "24h"}
    )
  }

}
