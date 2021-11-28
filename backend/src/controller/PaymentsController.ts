import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Payment } from "../entity/Payment";
import { User } from "../entity/User";

export class PaymentsController {

    private paymentRepository = getRepository(Payment);
    private userRepository = getRepository(User);

    async addPayment(request: Request, response: Response, next: NextFunction) {

        const user = await this.userRepository.findOne({ where: { id: request.body.userId } });
        const payment = new Payment();
        const date = new Date();

        payment.city = request.body.city;
        payment.area = request.body.area;
        payment.plateNumber = request.body.plateNumber;
        payment.duration = request.body.duration;
        payment.price = request.body.price;
        payment.date = date.toUTCString();
        payment.user = user;

        return await this.paymentRepository.save(payment);
    }

    async getPayments(request: Request, response: Response, next: NextFunction) {
        return await this.paymentRepository.find({ relations: ['user'], where: { user: { id: request.query.userId } } });
    }
}

