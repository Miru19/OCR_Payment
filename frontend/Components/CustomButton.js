import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export class CustomButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Button 
            onPress={this.props.onPress}
            mode="contained"
            color={this.props.color}
            uppercase={false}
            style={styles.button}
            labelStyle={{fontSize: 20, color: this.props.fontColor}}
            >
                {this.props.buttonText}
            </Button>
        );
    }
}

const styles=StyleSheet.create({
    button:{
        borderRadius: 15,
        width: '80%',
        margin: 10
    }
})