import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { withTheme } from 'react-native-elements';
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

  const styles = StyleSheet.create({
    footerContainer: {
      backgroundColor: '#0065ff'
    },
    navIcon: {
      color: 'white'
    }
  })

  return (
      <Footer style={styles.footerContainer}>
        <FooterTab style={styles.footerContainer}>
          <Button onPress={() => {navigation.navigate('Feed')}}>
            <Icon type="FontAwesome" name="home" style={styles.navIcon} />
          </Button>
          {routeName === "Feed" ?
          <Button onPress={() => {
            navigation.navigate('Challenge Create')
            }}>
            <Icon type="AntDesign" name="pluscircle" style={styles.navIcon} />
          </Button>
          :
          routeName === "Profile" ?
          <Button style={styles.navIcon} onPress={() => {
            navigation.navigate('Team Create')
            }}>
            <Icon type="AntDesign" name="pluscircle" style={styles.navIcon} />
          </Button>
          :
          null }
          <Button style={styles.navIcon} onPress={() => {navigation.navigate('Profile')}}>
            <Icon type="FontAwesome" name='user' style={styles.navIcon} />
          </Button>
        </FooterTab>
      </Footer>
  );
}