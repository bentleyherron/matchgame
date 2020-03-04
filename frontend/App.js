// GESTURE HANDLER MUST BE FIRST IMPORT
import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from "native-base";

import Nav from './views/Navigation/Nav';
import Profile from './views/Profile/ProfileContainer';
import Feed from './views/Feed/FeedContainer';
import SignupContainer from './views/Signup/SignupContainer';

const Stack = createStackNavigator();

export default function App() {

  const [isReady, setIsReady] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
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
  }, [])
  
  if (!isReady) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Root>
        <Stack.Navigator initialRouteName={hasSignedUp ? "Feed" : "Signup"}>
          <Stack.Screen name="Signup" component={SignupContainer} options={{headerShown: false}} initialParams={{
            setUserData,
            userData,
            setFavoriteSports,
            favoriteSports,
            setHasSignedUp
          }} />
          <Stack.Screen name="Profile" options={{headerShown: false}} component={Profile} />
          <Stack.Screen name="Feed" options={{headerShown: false}} component={Feed} />
          {hasSignedUp ? <Nav /> : null}
        </Stack.Navigator>
      </Root>
    </NavigationContainer>
  );
}



