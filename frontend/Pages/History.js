import React from "react";
import { List, Text } from "react-native-paper";
import axiosInstance from "../api/instance";

export class History extends React.Component{
    constructor(props){
        super(props);
    }

    async readPayments() {
        const response = await axiosInstance.get("/users/all");
        const payments = [];
        for(let index=0;index<response.data.length;index++){
            payments.push(<List.Item></List.Item>);
        }
        console.log(payments);
        return (payments);
    }

    render(){
        return(
            <Text>
   
            </Text>
        );
    }
}