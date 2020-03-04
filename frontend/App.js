import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Nav from './views/Navigation/Nav';
import Profile from './views/Profile/ProfileContainer';
import Feed from './views/Feed/FeedContainer';
import Loading from './views/Navigation/Loading';
import SignupContainer from './views/Signup/SignupContainer';
import DisplayHeader from './views/Navigation/DisplayHeader';
import { Container, Content, Header, Left, Body, Right, Title, Footer, Root }  from 'native-base';
import {SafeAreaView} from 'react-native';

export default function App() {

  const [isReady, setIsReady] = useState(false);
  const [currentPage, setCurrentPage] = useState('pageOne');
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
    <Container>
          {currentPage === 'pageOne' || currentPage === 'pageTwo' || currentPage === 'pageThree' || currentPage === 'pageFour' || currentPage === 'pageFive' ?
          <SignupContainer
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setUserData={setUserData}
          userData={userData}
          setFavoriteSports={setFavoriteSports}
          favoriteSports={favoriteSports}
          />
          :
          null}
          {currentPage === 'Profile' ? <Profile /> : null}
          {currentPage === "Feed" ? <Feed setPage={setCurrentPage} setLastPage={setLastPage} currentPage={currentPage} /> : null }
          {currentPage === "Loading" ? <Loading /> : null}
          {currentPage !== 'pageOne' && currentPage !== 'pageTwo' && currentPage !== 'pageThree' && currentPage !== 'pageFour' && currentPage !== 'pageFive' ?
          <Nav setPage={setCurrentPage} setLastPage={setLastPage} currentPage={currentPage} />
          :
          null
          }
          </Container>
  );
}



