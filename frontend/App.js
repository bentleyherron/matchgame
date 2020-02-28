import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Nav from './views/Nav';
import Profile from './views/Profile/ProfileContainer';
import Feed from './views/Feed/FeedContainer';
import Loading from './views/Loading';
import SignupContainer from './views/SignUp/SignupContainer';
import { Container, Content, Header, Body, Title }  from 'native-base';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      currentPage: 'profile',
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
        <Container>
          <Header>
            <Body>
              <Title>{currentPage}</Title>
            </Body>
          </Header>
          <Content>
            {currentPage === 'profile' ? <Profile /> : null}
            {currentPage === "feed" ? <Feed setPage={_setCurrentPage} setLastPage={_setLastPage} currentPage={currentPage} /> : null }
            {currentPage === "loading" ? <Loading /> : null}
            {/* {!hasSignedUp ? <SignupContainer/> : null} */}
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
