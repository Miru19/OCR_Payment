import React from "react";
import { StyleSheet, ImageBackground, View, Keyboard } from 'react-native';
import { FormComponent } from "../Components/FormComponent";

const image = require('../assets/SignIn.png');

export class Sign extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userExists = this.props.route.params.userExists;
        return (
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.container} >
                    <FormComponent signUp={!userExists} navigation={this.props.navigation}/>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40%',
        width: '100%'
    }
});