import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

}
