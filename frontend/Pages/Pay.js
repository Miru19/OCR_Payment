import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from "react-native-paper";
import { CustomButton } from "../Components/CustomButton";
import * as FileSystem from 'expo-file-system';

export class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            citiesOpen: false,
            areasOpen: false
        }

        this.setCitiesOpen = this.setCitiesOpen.bind(this);
        this.setAreasOpen = this.setAreasOpen.bind(this);
    }

    citiesList = [
        { label: 'Brasov', value: 'Brasov' },
        { label: 'Cluj Napoca', value: 'Cluj Napoca' },
        { label: 'Bucuresti', value: 'Bucuresti' },
    ]


    areasList = [
        { label: 'Area 0', value: '0' },
        { label: 'Area 1', value: '1' },
        { label: 'Area 2', value: '2' },
    ]

    setCitiesOpen() {
        this.setState({ citiesOpen: !this.state.citiesOpen });
    }

    setAreasOpen() {
        this.setState({ areasOpen: !this.state.areasOpen });
    }

    convert(){
        console.log(require('../assets/plate.jpeg'));
        FileSystem.readAsStringAsync(require('../assets/plate.jpeg')).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <DropDownPicker
                    open={this.state.citiesOpen}
                    items={this.citiesList}
                    setOpen={this.setCitiesOpen}

                />
                <DropDownPicker
                    open={this.state.areasOpen}
                    items={this.areasList}
                    setOpen={this.setAreasOpen}
                />
                <CustomButton buttonText="Scan Plate" color="#29356d" fontColor="#ffffff" onPress={()=>{this.convert()}}/>
                <Text> or </Text>
                <TextInput mode="outlined" label="Plate Number" style={styles.input} />

                <CustomButton buttonText="Pay" color="#29356d" fontColor="#ffffff" />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%'
    },
    input: {
        width: '80%',
        margin: 15,
        borderRadius: 15,
    },
});