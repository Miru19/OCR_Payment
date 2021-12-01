import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Payment } from "../entity/Payment";
import { User } from "../entity/User";
import { print } from "util";

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
    async getZonePrice(request: Request, response: Response, next: NextFunction){
        let zonePrice;
        console.log(request.query)
        if(request.query&&request.query.zone){
            switch(request.query.zone){
                case '0':
                    zonePrice=3;
                    break;
                case '1':
                    zonePrice=2;
                    break;
                case '2':
                    zonePrice=1;
                    break;
                default:
                    return response.status(500).json({message:"Invalid Request"});
            }
            return response.status(201).json({price:zonePrice});
        }
        return response.status(500).json({message:"Unknown error occured"});
    }
}

