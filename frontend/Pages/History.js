import React from "react";
import { List } from "react-native-paper";

import { StyleSheet, Image, View, Text } from 'react-native';
import UserContext from "../Context/UserContext";
import api from "../api";

const image = require('../assets/emptyState.png')
export class History extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            payments: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        try {
            const response = await api.getHistory(this.context.userId);
            const payments = [];

            for (let index = 0; index < response.length; index++) {
        
                const title = response[index].plateNumber.toUpperCase();
                const description = response[index].city + 
                " - Area: " + response[index].area + 
                "\nDuration: " + response[index].duration +" hours"+ 
                " - Price: " + response[index].price + " RON"+ 
                "\nDate: "+ response[index].date;

                payments.push(
                    <List.Item
                        title={title}
                        description={description}
                        key={index}
                        descriptionNumberOfLines = {3}
                        left={props => <List.Icon {...props} icon="car" />}
                    />)
            }
            
            this.setState({ payments: payments });
        } catch (error) {
            console.log(error);
        }
        
    }

    render() {
        return (
            <>
                {this._isMounted === false &&
                    <View style={styles.container}>
                        <Text style={{ fontSize: 15, fontWeight: '800', color: "#29356d" }}>Loading...</Text>
                    </View>
                }
                {this._isMounted === true && this.state.payments.length == 0 &&
                    <View style={styles.container}>
                        <Image source={image} />
                        <Text style={{ fontSize: 15, fontWeight: '800', color: "#29356d" }}>No payments yet.</Text>
                    </View>
                }
                {this._isMounted === true && this.state.payments.length != 0 &&
                    <>
                        {this.state.payments}
                    </>

                }

            </>
        );
    }
}
History.contextType = UserContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});