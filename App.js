import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartPage } from './Pages/StartPage';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen  name="StartPage" component={StartPage} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


