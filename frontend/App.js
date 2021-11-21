import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartPage } from './Pages/StartPage';
import {Sign} from './Pages/Sign';
import { Menu } from './Pages/MenuPage';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen  name="StartPage" component={StartPage} options={{headerShown: false}}/>
        <Stack.Screen  name="Sign" component={Sign} options={{headerShown: false}}/>
        <Stack.Screen  name="Menu" component={Menu} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


