import React from "react";
import { StyleSheet, View, Text, ImageEditor } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from "react-native-paper";
import { CustomButton } from "../Components/CustomButton";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import api from "../api";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
export class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            citiesOpen: false,
            areasOpen: false,
            plateNumber: ""
        }

        this.setCitiesOpen = this.setCitiesOpen.bind(this);
        this.setAreasOpen = this.setAreasOpen.bind(this);
        this.selectImage = this.selectImage.bind(this);
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

    selectImage() {
        let permissionResult = ImagePicker.requestMediaLibraryPermissionsAsync().then(permissionResult => {
            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }
            ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(pickerResult => {
                if (!pickerResult.cancelled) {
                    manipulateAsync(pickerResult.uri, [{ resize: { width: 1000 } }], { base64: true }).then(resizedPhoto => {
                        api.getPlateNumber(resizedPhoto.base64).then(response => {
                            response.json().then(plateDetails => {
                                if (plateDetails.results.length > 0) {
                                    this.setState({ plateNumber: plateDetails.results[0].plate.toUpperCase() });
                                }
                            })
                        }).catch(error => {
                            console.log(error);
                        })
                    })
                }
            }).catch(pickerErr => {
                alert("Picker error");
            })
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
                <CustomButton buttonText="Scan Plate" color="#29356d" fontColor="#ffffff" onPress={this.selectImage} />
                <Text> or </Text>
                <TextInput
                    mode="outlined"
                    label="Plate Number"
                    value={this.state.plateNumber}
                    style={styles.input} />

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