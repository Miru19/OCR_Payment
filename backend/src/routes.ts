import {UserController} from "./controller/UserController";
import {ApiController} from "./controller/ApiController";
import { PaymentsController } from "./controller/PaymentsController";
export const Routes = [{
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login"
}, {
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "register"
}, {
    method: "get",
    route: "/users/all",
    controller: UserController,
    action: "getAll"
},{
    method: "post",
    route: "/getPlateNumber",
    controller: ApiController,
    action: "getPlateNumber"
},{
    method: "post",
    route: "/payments/addPayment",
    controller: PaymentsController,
    action: "addPayment"
},{
    method: "get",
    route: "/payments/getPayments",
    controller: PaymentsController,
    action: "getPayments"
},
{
    method: "get",
    route: "/payments/getzoneprice",
    controller: PaymentsController,
    action: "getZonePrice"
}];