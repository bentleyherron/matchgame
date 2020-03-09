import React from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
export default function Nav( {state, navigation}) {
  const currentRouteKey = state.history[state.history.length - 1];
  const {routes} = state;
  const route = routes.filter(obj => obj.key === currentRouteKey.key);
  let routeName;
  if (route.length) {
    routeName = route[0].name
  } else {
    routeName = null;
  }
  return (
      <Footer>
        <FooterTab>
          <Button onPress={() => {navigation.navigate('Feed')}}>
            <Icon type="FontAwesome" name="fire"/>
            <Text>Feed</Text>
          </Button>
          {routeName === "Feed" ?
          <Button onPress={() => {
            navigation.navigate('Challenge Create')
            }}>
            <Icon type="AntDesign" name="pluscircle" />
          </Button>
          :
          routeName === "Profile" ?
          <Button onPress={() => {
            navigation.navigate('Team Create')
            }}>
            <Icon type="AntDesign" name="pluscircle" />
          </Button>
          :
          null }
          <Button onPress={() => {navigation.navigate('Profile')}}>
            <Icon type="FontAwesome" name='user'/>
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
  );
}