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
        const currentDate = new Date();
        try{
            payment.city = request.body.city;
            payment.area = request.body.area;
            payment.duration = request.body.duration;
            payment.price=(this.localGetZonePrice(payment.area)* parseInt(payment.duration)).toString();
            payment.plateNumber = request.body.plateNumber;

            payment.date = currentDate.getDate().toString() + "/" + currentDate.getMonth().toString() + "/" + currentDate.getFullYear().toString() 
            + " " + currentDate.getHours().toString() + ":" +currentDate.getMinutes().toString() + ":" + currentDate.getSeconds().toString();
            payment.user = user;
            
            await this.paymentRepository.save(payment);
            return response.status(201).json({message:"Payment succesful"});
        }catch(errMsg){
            console.log(errMsg);
            return response.status(500).json({ message: errMsg });
        }
       
    }

    async getPayments(request: Request, response: Response, next: NextFunction) {
        return await this.paymentRepository.find({ relations: ['user'], where: { user: { id: request.query.userId } } });
    }
    async getZonePrice(request: Request, response: Response, next: NextFunction) {
        if (request.query && request.query.zone) {
            try {
                const zonePrice = this.localGetZonePrice(request.query.zone);
                return response.status(201).json({ price: zonePrice });
            } catch (errMsg) {
                return response.status(500).json({ message: errMsg });
            }

        }
        return response.status(500).json({ message: "Unknown error occured" });
    }
    localGetZonePrice(zone) {
        let zonePrice;
        switch (zone) {
            case '0':
                zonePrice = 3;
                break;
            case '1':
                zonePrice = 2;
                break;
            case '2':
                zonePrice = 1;
                break;
            default:
                throw "Invalid Request";
        }
        return zonePrice;
    }
}

