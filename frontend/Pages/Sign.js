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
        const buttonText = userExists ? "Sign In" : "Sign Up";
        return (
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.container} >
                    <FormComponent buttonText={buttonText} signIn={!userExists}/>
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
        marginTop: '20%',
        width: '100%'
    }
});