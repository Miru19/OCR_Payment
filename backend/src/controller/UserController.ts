import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async getUser(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.body.email);
    }

    async addUser(request: Request, response: Response, next: NextFunction) {
        const user = {
            userName: request.body.userName,
            email: request.body.email,
            password: request.body.password
        }
        console.log(user);
        return this.userRepository.save(user);
    }


}