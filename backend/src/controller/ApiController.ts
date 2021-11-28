import { NextFunction, Request, Response } from "express";
import * as httpRequest from "request";
export class ApiController {

    getPlateNumber(request: Request, response: Response, next: NextFunction) {

        httpRequest.post("https://api.platerecognizer.com/v1/plate-reader/", {
            headers: {
                "Authorization": "Token b8614fdc2a0765732c3cd5ed5c94e2dd82e4dd78",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(request.body)
        },function(err,res,body){
            console.log(body);
            response.status(201).send(body);
        })
        
    }


}