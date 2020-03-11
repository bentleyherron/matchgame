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


import Nav from './views/Navigation/Nav';
import Profile from './views/Profile/ProfileContainer';
import Feed from './views/Feed/FeedContainer';
import SignupContainer from './views/Signup/SignupContainer';
import TeamCreate from './views/TeamCreate/TeamCreateContainer';
import ChallengeCreate from './views/ChallengeCreate/ChallengeCreateContainer';
import UserContext from './UserContext';
import TeamContext from './views/TeamCreate/TeamContext';

const Tab = createBottomTabNavigator();

export default function App() {

  const [isFontReady, setIsFontReady] = useState(false);
  const [isSportsDataReady, setIsSportsDataReady] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(true);
  const [userData, setUserData] = useState(null);
  const [sportData, setSportData] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

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
      // axios.get(`${URL}/profile/`, {
      //   headers: {
      //     "x-access-token": userToken
      //   }
      // }).then(
      //   response => {
      //     setUserData(response.data);
      //     setIsLoading(false)
      //   });
      axios.get(`${URL}/profile/3`)
        .then(
          r => {
            setUserData(r.data)
            setIsLoading(false)
          }
        )
        
        axios.get(`${URL}/sports`).then(
          r => {
            setSportData(r.data);
            setIsSportsDataReady(true);
          }
          );
    }
  }, [hasSignedUp, shouldRefresh])

  const userContextValue = {
    state: {
      userData,
      hasSignedUp,
      sportData,
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

  if (!isFontReady || isLoading) {
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
            </Tab.Navigator>
          </UserContext.Provider>
        </Root>
      </NavigationContainer>
    </Container>
  );
}



