import React from "react";
import { Snackbar, TextInput, Text } from "react-native-paper";
import { CustomButton } from "../Components/CustomButton";
import { StyleSheet } from 'react-native';
import api from "../api";

export class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            userName: null,
            isSnackBarVisible: false,
            snackBarText: "",
            signUp: this.props.signUp
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.signUpPressed = this.signUpPressed.bind(this);
        this.signInPressed = this.signInPressed.bind(this);
        this.onDismissSnackBar = this.onDismissSnackBar.bind(this);
        this.onSignUpTextPressed = this.onSignUpTextPressed.bind(this);
    }

    onChangeEmail(email) {
        this.setState({ email: email })
    }

    onChangePassword(password) {
        this.setState({ password: password })
    }

    onChangeUserName(userName) {
        this.setState({ userName: userName })
    }

    async signUpPressed() {
        const email = this.state.email;
        const password = this.state.password;
        const userName = this.state.userName;
        api.doSignUp({email,password,userName}).then(async response=>{
            const responseBody = await response.json();
            if(response.status==201){
                console.log(response.status);
                this.props.navigation.navigate("Menu", {userId: responseBody.id});
            }else{
                console.log(response.status);
                this.setState({ isSnackBarVisible: true, snackBarText:responseBody.message });
            }
        }).catch(error=>{
            this.setState({ isSnackBarVisible: true, snackBarText:"Server connection failed" });
        })
    }

    async signInPressed() {
        const email = this.state.email;
        const password = this.state.password;
        api.doSignIn({email,password}).then(async response=>{
            const responseBody = await response.json();
            if(response.status==201){
                console.log(response.status);
                this.props.navigation.navigate("Menu", {userId: responseBody.id});
            }else{
                console.log(response.status);
                this.setState({ isSnackBarVisible: true, snackBarText:responseBody.message });
            }
        }).catch(error=>{
            this.setState({ isSnackBarVisible: true, snackBarText:"Server connection failed" });
        })
    }

    onSignUpTextPressed() {
        this.setState({ signUp: false });
    }

    onDismissSnackBar() {
        this.setState({ isSnackBarVisible: false });
    }

    render() {
        const buttonText = this.state.signUp ? "Sign Up" : "Sign In";
        const buttonEvent = this.state.signUp ? this.signUpPressed : this.signInPressed;
        const textContent = this.state.signUp ? "Already have an acoount? Sign In" : "Forgot your passowrd?";
        const textEvent = this.state.signUp ? this.onSignUpTextPressed : this.onSignUpTextPressed;

        return (
            <>
                {this.state.signUp &&
                    <TextInput
                        mode="outlined"
                        label="Name"
                        value={this.state.userName}
                        onChangeText={(userName) => this.onChangeUserName(userName)}
                        style={styles.input}
                    />
                }
                <TextInput
                    mode="outlined"
                    label="Email"
                    value={this.state.email}
                    onChangeText={(email) => this.onChangeEmail(email)}
                    style={styles.input}
                />

                <TextInput
                    mode="outlined"
                    label="Password"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.onChangePassword(password)}
                    style={[styles.input, styles.lastInput]} />

                <CustomButton buttonText={buttonText} color="#29356d" fontColor="#ffffff" onPress={buttonEvent} />

                <Snackbar
                    visible={this.state.isSnackBarVisible}
                    onDismiss={this.onDismissSnackBar}
                    duration="3000"
                    style={styles.snackBar}>
                    {this.state.snackBarText}
                </Snackbar>

                <Text style={styles.text} onPress={textEvent}>{textContent}</Text>
            </>
        );

    }
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        margin: 15,
        borderRadius: 15,
    },
    lastInput: {
        marginBottom: 50,
    },
    snackBar: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: "#29356d",
        borderRadius: 15,
        marginBottom: '130%',
        width: '80%',
    },
    text: {
        color: "#29356d",
        marginVertical: 20,
        fontSize: 15,
        textDecorationLine: 'underline'
    }
})