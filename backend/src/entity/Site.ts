import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Site {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ip: string;

    @Column()
    description: string;

    @Column()
    region: string;

    @Column()
    organization: string;

    @Column()
    score: number;

    @ManyToOne(type => User, user => user.sites) user: User; 

}
