import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pay } from "./Pay";
import { History } from "./History";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

export class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer independent={true}>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: () => {
                        let iconName;
                        if (route.name === 'Pay') {
                            iconName = 'card';
                        } else if (route.name === 'History') {
                            iconName = 'time';
                        }
                        return <Ionicons name={iconName} size={25}/>;
                    },
                    headerStyle: {backgroundColor:"#91bae5"},
                    tabBarStyle: {backgroundColor:"#91bae5"},
                
                })}>
                    <Tab.Screen name="Pay" component={Pay} />
                    <Tab.Screen name="History" component={History} />
                </Tab.Navigator>
            </NavigationContainer>
        );

    }
}