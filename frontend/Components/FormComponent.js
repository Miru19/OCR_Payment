import React from "react";
import { TextInput } from "react-native-paper";
import { CustomButton } from "../Components/CustomButton";
import { StyleSheet } from 'react-native';
import axiosInstance from "../api/instance";

export class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName: ""
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.signInPressed = this.signInPressed.bind(this);
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

    async signInPressed(){
        const email = this.state.email;
        const password = this.state.password;
        const userName = this.state.userName;
        console.log(userName);
        await axiosInstance.post("/users/register", {email, password, userName})
    }

    render() {
        return (
            <>
                {this.props.signIn &&
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

                <CustomButton buttonText={this.props.buttonText} color="#29356d" fontColor="#ffffff" onPress={this.signInPressed}/>
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
    }
})