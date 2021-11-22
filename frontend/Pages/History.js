import React from "react";
import { List } from "react-native-paper";
import axiosInstance from "../api/instance";
import { StyleSheet, Image, View, Text } from 'react-native';

const image = require('../assets/emptyState.png')
export class History extends React.Component {
    constructor(props) {
        super(props);
    }

    async readPayments() {
        const response = await axiosInstance.get("/users/all");
        const payments = [];
        for (let index = 0; index < response.data.length; index++) {
            payments.push(<List.Item></List.Item>);
        }
        console.log(payments);
        return (payments);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={image} />
                <Text style={{fontSize:15, fontWeight:'800', color:"#29356d"}}>No payments yet.</Text>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});