import {UserController} from "./controller/UserController";
import {ApiController} from "./controller/ApiController";
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
}];