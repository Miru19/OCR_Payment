import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string

    @Column()
    area: string

    @Column()
    plateNumber: string

    @Column()
    duration: string;

    @Column()
    date: string;

    @Column()
    price: string;

    @ManyToOne(()=> User, user => user.id)
    user: User

}
