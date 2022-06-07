import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Meta {

    @PrimaryColumn()
    key: string;

    @Column()
    value: string;

    @Column()
    own: string;

    @CreateDateColumn()
    crated_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}