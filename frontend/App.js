import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Nav from './views/Nav';
import Profile from './views/Profile/ProfileContainer';
import Feed from './views/Feed/FeedContainer';
import Loading from './views/Loading';
import SignupContainer from './views/SignUp/SignupContainer';
import { Container, Content, H1, Header }  from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      currentPage: 'pageOne'
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
    const { currentPage, isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }

    return (
        <Container>
          <Header/>
          <Content>
            {currentPage === 'profile' ? <Profile /> : null}
            {currentPage === "feed" ? <Feed /> : null }
            {currentPage === "loading" ? <Loading /> : null}
            {/* {currentPage === "pageOne" || "pageTwo" || "pageThree" ? <SignupContainer/> : null} */}
          </Content>
          <Nav setPage={_setCurrentPage} setLastPage={_setLastPage} currentPage={currentPage} />
        </Container>
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
