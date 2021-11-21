import {UserController} from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "getUser"
}, {
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "addUser"
}];