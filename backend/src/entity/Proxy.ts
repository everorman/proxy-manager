import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

enum ProxyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
@Entity()
export class Proxy {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  host: string;

  @Column()
  sock5: string;

  @Column({
    type: "set",
    enum: ProxyStatus,
    default: [ProxyStatus.INACTIVE],
  })
  status: string;

  @Column()
  hostUser: string;

  @Column()
  hostPassword: string;

  @Column()
  description: string;

  @Column()
  urlReset: string;

  @Column()
  created_by: number;

  @CreateDateColumn()
  created_at: Date



  @ManyToOne(type => User, user => user.proxies) user: User;

}
