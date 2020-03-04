import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from "native-base";
import App from './App';

const Stack = createStackNavigator();

export default function Root() {
    return (
    <NavigationContainer>
        <Root>
            <Stack.Navigator>
                <App />
            </Stack.Navigator>
        </Root>
    </NavigationContainer>
    );
}