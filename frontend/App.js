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
  const [isUserDataReady, setIsUserDataReady] = useState(false);
  const [isSportsDataReady, setIsSportsDataReady] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(true);
  const [userData, setUserData] = useState(null);
  const [sportData, setSportData] = useState(null);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    }).then(() => {
      setIsFontReady(true);
    }
    )
    axios.get(`${URL}/profile/2`).then(
      response => {
        setUserData(response.data);
        setHasSignedUp(true);
        setIsUserDataReady(true)
      });
      
      axios.get(`${URL}/sports`).then(
        r => {
          setSportData(r.data);
          setIsSportsDataReady(true);
        }
        );
  }, [])

  const userContextValue = {
    state: {
      userData,
      hasSignedUp,
      sportData
    },
    actions: {
      setHasSignedUp,
      setUserData,
      setSportData
    }
  }
  // hasSignedUp ? "Feed" : "Signup"
  
  if (!isFontReady || !isUserDataReady || !isSportsDataReady) {
    return <AppLoading />;
  }
  return (
    <Container>
      <NavigationContainer>
        <Root>
          <UserContext.Provider value={userContextValue}>

            <Tab.Navigator initialRouteName={"Team Create"} tabBar={props => <Nav {...props} />}>
              <Tab.Screen name="Signup" options={{tabBarVisible: false, showLabel: false, showIcon: false}} component={SignupContainer} />
              <Tab.Screen name="Profile" component={Profile} />
              <Tab.Screen name="Challenge Create" component={ChallengeCreate} />
              <Tab.Screen name="Feed" component={Feed} />
              <Tab.Screen name="Team Create" component={TeamCreate} options={{tabBarVisible: false, showLabel: false, showIcon: false}} />
              {/* <Tab.Screen name="Team Create" component={TeamCreate} /> */}
            </Tab.Navigator>

          </UserContext.Provider>
        </Root>
      </NavigationContainer>
    </Container>
  );
}



