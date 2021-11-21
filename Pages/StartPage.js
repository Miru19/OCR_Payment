import React from "react";
import { CustomButton } from "../Components/CustomButton";
import { StyleSheet, ImageBackground, View, Text } from 'react-native';

export class StartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageBackground source={require('../assets/StartPageImage.png')} resizeMode="cover" style={styles.image}>
                <View style={styles.textContainer}>
                    <Text style={{fontSize:40, fontWeight:'800', color:"#29356d"}}>SMART PARK</Text>
                    <Text style={{fontSize:15, fontWeight:'800', color:"#29356d"}}>Your app for park taxes.</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <CustomButton buttonText="Sign In" color="#29356d" fontColor="#ffffff" />
                    <CustomButton buttonText="Sign Up" color="#ffffff" fontColor="#29356d" />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '30%'
    },
    textContainer: {
        flex: 1,
        marginTop:'40%',
        marginLeft: '10%'
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
});

// cont
// salvare numere scanate/introduse -> id user + sugestii 
// retinere tarife in functie de oras, zona
// alegere oras, timp
// notificare expirare 