// GESTURE HANDLER MUST BE FIRST IMPORT
import 'react-native-gesture-handler';

import React, { useState, useEffect, createContext } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Root, Text, Container } from "native-base";
import axios from 'axios';
import {URL} from 'react-native-dotenv';

import MapPage from './views/Feed/MapPage';
import ErrorPage from './views/Navigation/ErrorPage';
import Nav from './views/Navigation/Nav';
import Profile from './views/Profile/ProfileContainer';
import Feed from './views/Feed/FeedContainer';
import SignupContainer from './views/Signup/SignupContainer';
import TeamCreate from './views/TeamCreate/TeamCreateContainer';
import ChallengeCreate from './views/ChallengeCreate/ChallengeCreateContainer';
import UserContext from './UserContext';
import TeamContext from './views/TeamCreate/TeamContext';

const Tab = createBottomTabNavigator();
console.disableYellowBox = true;

export default function App() {

  const [isFontReady, setIsFontReady] = useState(false);
  const [isSportsDataReady, setIsSportsDataReady] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [userData, setUserData] = useState(null);
  const [sportData, setSportData] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const sportIcons = [
    {id: 1, name: "Football", family: "FontAwesome5", icon:"football-ball"},
    {id: 2, name: "Basketball", family: "FontAwesome5", icon:"basketball-ball"},
    {id: 3, name: "Kubb", family: "FontAwesome5", icon:"crown"},
    {id: 4, name: "Darts", family: "FontAwesome5", icon:"bullseye"},
    {id: 5, name: "Ultimate Frisbee", family: "Feather", icon:"disc"},
    {id: 6, name: "Soccer", family: "MaterialCommunityIcons", icon:"soccer"},
    {id: 7, name: "Wiffle Ball", family: "MaterialCommunityIcons", icon:"baseball-bat"},
    {id: 8, name: "Softball", family: "FontAwesome5", icon:"baseball-ball"},
    {id: 9, name: "Baseball", family: "FontAwesome5", icon:"baseball-ball"},
    {id: 10, name: "Bowling", family: "FontAwesome5", icon:"bowling-ball"},
    {id: 11, name: "Kickball", family: "FontAwesome", icon:"circle"},
    {id: 12, name: "Beer Pong", family: "MaterialCommunityIcons", icon:"beer"},
    {id: 13, name: "Cornhole", family: "MaterialCommunityIcons", icon:"corn"},
    {id: 14, name: "Volleyball", family: "FontAwesome5", icon:"volleyball-ball"},
    {id: 15, name: "Bocce Ball", family: "MaterialCommunityIcons", icon:"tennis-ball"},
    {id: 16, name: "Ping Pong", family: "FontAwesome5", icon:"table-tennis"},
    {id: 17, name: "Golf", family: "MaterialCommunityIcons", icon:"golf"},
    {id: 18, name: "Tennis", family: "MaterialCommunityIcons", icon:"tennis"},
    {id: 19, name: "Lacrosse", family: "MaterialCommunityIcons", icon:"hockey-sticks"}
  ]

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    }).then(() => {
      setIsFontReady(true);
    }
    )
  }, [])

  useEffect(() => {
    if(hasSignedUp) {
      setIsLoading(true);
      axios.get(`${URL}/profile/`, {
        headers: {
          "x-access-token": userToken
        }
      }).then(
        response => {
          setUserData(response.data);
          setIsLoading(false);
        }).catch((err) => {
          console.log(err);
        })
  }}, [hasSignedUp, shouldRefresh])

  useEffect(() => {
    axios.get(`${URL}/sports`).then(
      r => {
        setSportData(r.data);
        setIsSportsDataReady(true);
      })
      .catch((err) => console.log(err))
  }, [shouldRefresh])

  const userContextValue = {
    state: {
      userData,
      hasSignedUp,
      sportData,
      sportIcons,
      userToken,
      shouldRefresh
    },
    actions: {
      setHasSignedUp,
      setUserData,
      setSportData,
      setUserToken,
      setShouldRefresh
    }
  }

  if (!isFontReady || isLoading || !isSportsDataReady) {
    return <AppLoading />;
  }
  return (
    <Container>
      <NavigationContainer>
        <Root>
          <UserContext.Provider value={userContextValue}>
            <Tab.Navigator initialRouteName={hasSignedUp ? "Profile" : "Signup"} tabBar={props => <Nav {...props} />}>
              <Tab.Screen name="Signup" options={{tabBarVisible: false, showLabel: false, showIcon: false}} component={SignupContainer} />
              <Tab.Screen name="Profile" component={Profile} />
              <Tab.Screen name="Challenge Create" component={ChallengeCreate} />
              <Tab.Screen name="Feed" component={Feed} />
              <Tab.Screen name="Team Create" component={TeamCreate} options={{tabBarVisible: false, showLabel: false, showIcon: false}} />
              <Tab.Screen name="Error" component={ErrorPage} options={{tabBarVisible: false, showLabel: false, showIcon: false}} />
              <Tab.Screen name="Map" component={MapPage} options={{tabBarVisible: false, showLabel: false, showIcon: false}} />
            </Tab.Navigator>
          </UserContext.Provider>
        </Root>
      </NavigationContainer>
    </Container>
  );
}



