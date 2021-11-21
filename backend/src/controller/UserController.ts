import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;

            console.log(request.body);
            if (!(email && password)) {
                response.status(401).send("All input are required");
                return;
            }

            const userExists = await this.userRepository.findOne({ where: { email: email } });

            if (userExists && userExists.password == password) {

                response.status(201).send({id: userExists.id});
                return;
            }

            response.status(401).send("Invalid Credentials");

        } catch (error) {
            console.log(error);
        }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        try {
            const { userName, email, password } = request.body;

            if (!(userName && email && password)) {
                response.status(401).send("All inputs are required");
                return;
            }

            const userExists = await this.userRepository.findOne({ where: { email: email } });
            if (userExists) {
                response.status(409).send("User Already Exist. Please Sign In");
                return;
            }

            const user = {
                userName: userName,
                email: email.toLowerCase(),
                password: password,
            };

            const newUser = await this.userRepository.save(user);
            response.status(201).send({id: newUser.id});

        } catch (error) {
            console.log(error);
        }
    }


}