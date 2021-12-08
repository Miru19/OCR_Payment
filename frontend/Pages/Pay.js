import React from "react";
import { StyleSheet, View, Text, ImageEditor } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Snackbar } from "react-native-paper";
import { CustomButton } from "../Components/CustomButton";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import api from "../api";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import {
    DropdownList,
} from 'react-native-ultimate-modal-picker';
export class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            citiesOpen: false,
            areasOpen: false,
            plateNumber: "",
            parkingTime: "0",
            chosenCity: "",
            chosenZone: "",
            zonePrice: 0,
            totalPrice: 0,
            userId: 1,
            isSnackBarVisible: false,
            snackBarText: ""
        }

        this.setCitiesOpen = this.setCitiesOpen.bind(this);
        this.setAreasOpen = this.setAreasOpen.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.onDismissSnackBar = this.onDismissSnackBar.bind(this);
    }

    citiesList = [
        { label: 'Brasov', value: 'Brasov' },
        /*{ label: 'Cluj Napoca', value: 'Cluj Napoca' },
        { label: 'Bucuresti', value: 'Bucuresti' },*/
    ]


    areasList = [
        { label: 'Area 0', value: '0' },
        { label: 'Area 1', value: '1' },
        { label: 'Area 2', value: '2' },
    ]
    onDismissSnackBar() {
        this.setState({ isSnackBarVisible: false });
    }


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
    areaChanged = (value) => {
        this.setState({ chosenZone: value })
        api.getZonePrice(value).then(async response => {
            const parsedResp = await response.json();
            if (parsedResp.price) {
                console.log(parsedResp);
                this.setState({ zonePrice: parsedResp.price });
                const parkingTimeInt = this.state.parkingTime.toString();
                if (parkingTimeInt > 0) {
                    this.setState({ totalPrice: this.state.zonePrice * parkingTimeInt })
                }
            }
        })
    }

    parkingTimeChanged = (value) => {
        this.setState({ parkingTime: value })

        if (this.state.zonePrice != 0) {
            this.setState({ totalPrice: this.state.zonePrice * value });
        }
        console.log(this.state.totalPrice);
    }
    triggerPayment = () => {
        if (this.state.chosenCity != "" && this.state.chosenZone != "" && this.state.parkingTime != "0" && this.state.plateNumber != "") {
            const body = {
                city: this.state.chosenCity,
                area: this.state.chosenZone,
                duration: this.state.parkingTime,
                plateNumber: this.state.plateNumber,
                userId: this.state.userId,
            }
            api.payParking(body).then(async response => {
                response = await response.json();
                console.log(response);
            }).catch(err => {
                console.log(error);
            })
        } else {
            this.setState({ isSnackBarVisible: true, snackBarText: "Form input problem" });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <DropdownList
                    title="City"
                    items={this.citiesList}
                    onChange={(value) => this.setState({ chosenCity: value })}

                />
                <DropdownList
                    title="Area"
                    items={this.areasList}
                    onChange={(value) => this.areaChanged(value)}

                />
                <DropdownList
                    title="Parking time"
                    items={[...Array(10)].map((e, i) => {
                        return { label: (i + 1).toString() + ' hours', value: (i + 1).toString() }
                    }
                    )}
                    onChange={(value) => this.parkingTimeChanged(value)}
                />

                <CustomButton buttonText="Scan Plate" color="#29356d" fontColor="#ffffff" onPress={this.selectImage} />
                <Text> or </Text>
                <TextInput
                    mode="outlined"
                    label="Plate Number"
                    value={this.state.plateNumber}
                    style={styles.input}
                    onChangeText={(value) => this.setState({ plateNumber: value })} />
                {this.state.totalPrice > 0 && <Text style={{ fontSize: "20", fontWeight: "bold" }}>{this.state.totalPrice} lei</Text>}
                <CustomButton buttonText="Pay" onPress={() => this.triggerPayment()} color="#29356d" fontColor="#ffffff" />
                <Snackbar
                    visible={this.state.isSnackBarVisible}
                    onDismiss={this.onDismissSnackBar}
                    duration="3000"
                    style={styles.snackBar}>
                    {this.state.snackBarText}
                </Snackbar>

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
    snackBar: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: "#29356d",
        borderRadius: 15,
        marginBottom: '130%',
        width: '80%',
    },
});