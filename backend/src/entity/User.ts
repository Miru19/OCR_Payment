import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Payment } from "./Payment";

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    userName: string;

}
