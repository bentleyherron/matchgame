import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Nav from './views/Navigation/Nav';
import Profile from './views/Profile/ProfileContainer';
import Feed from './views/Feed/FeedContainer';
import Loading from './views/Navigation/Loading';
import SignupContainer from './views/Signup/SignupContainer';
import DisplayHeader from './views/Navigation/DisplayHeader';
import { Container, Content, Header, Left, Body, Right, Title, Footer }  from 'native-base';
import {SafeAreaView} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      currentPage: 'Profile',
      hasSignedUp: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  
  render() {
    const {_setCurrentPage, _setLastPage} = this;
    const { currentPage, isReady, hasSignedUp } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }
    return (
      <SafeAreaView style={{flex: 1}}>
          {/* <DisplayHeader currentPage={currentPage} /> */}
            {/* {currentPage === 'pageOne' || 'pageTwo' || 'pageThree' || 'pageFour' ? <SignupContainer/> : null} */}
            {currentPage === 'Profile' ? <Profile /> : null}
            {currentPage === "Feed" ? <Feed setPage={_setCurrentPage} setLastPage={_setLastPage} currentPage={currentPage} /> : null }
            {currentPage === "Loading" ? <Loading /> : null}
          <Nav setPage={_setCurrentPage} setLastPage={_setLastPage} currentPage={currentPage} />
      </SafeAreaView>
    );
  }

  _setCurrentPage = (text) => {
    this.setState({
      currentPage: text
    })
  }

  _setLastPage = (text) => {
    this.setState({
      lastPage: text
    })
  }
}


