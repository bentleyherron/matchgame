// GESTURE HANDLER MUST BE FIRST IMPORT
import 'react-native-gesture-handler';

import React, { useState, useEffect, createContext } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Root, Text, Container } from "native-base";
import axios from 'axios';
import {URL} from 'react-native-dotenv';

import Nav from './views/Navigation/Nav';
import Profile from './views/Profile/ProfileContainer';
import Feed from './views/Feed/FeedContainer';
import SignupContainer from './views/Signup/SignupContainer';
import UserContext from './UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [isReady, setIsReady] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(true);
  const [userData, setUserData] = useState(null);
  const [favoriteSports, setFavoriteSports] = useState(null);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    }).then(() => {
      setIsReady(true)
    }
    )
    axios.get(`${URL}/users/1`).then(
      response => {
        console.log(response.data);
        setUserData(response.data);
        setHasSignedUp(true);
      }
    ).then(
      console.log(userData)
    )

    axios.get(`${URL}/sports/1`).then(
      response => {
        setFavoriteSports(response.data);
      }
    )

  }, [])

  const userContextValue = {
    state: {
      userData,
      hasSignedUp,
      favoriteSports
    },
    actions: {
      setHasSignedUp,
      setUserData,
      setFavoriteSports
    }
  }
  
  if (!isReady) {
    return <AppLoading />;
  }
  return (
    <Container>
      <NavigationContainer>
        <Root>
          <UserContext.Provider value={userContextValue}>
            <Tab.Navigator initialRouteName="Feed">
              {/* <Stack.Screen name="Signup" options={{headerShown: false}} component={SignupContainer} /> */}
              <Tab.Screen name="Profile" component={Profile} />
              <Tab.Screen name="Feed" component={Feed} />
            </Tab.Navigator>
          </UserContext.Provider>
        </Root>
      </NavigationContainer>
    </Container>
  );
}



