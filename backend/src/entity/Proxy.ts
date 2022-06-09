import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from "typeorm";
import { User } from "./User";

@Entity()
export class Proxy {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ip: string;

    @Column()
    description: string;

    @Column()
    created_by: number;

    @CreateDateColumn()
    created_at: Date



    @ManyToOne(type => User, user => user.proxies) user: User; 

}
