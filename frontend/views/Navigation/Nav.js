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
          <Button warning rounded small onPress={() => {
            navigation.navigate('Challenge Create')
            }}>
              <Text style={{fontSize: 10, fontWeight: 'bold', color: 'white'}}>NEW CHALLENGE</Text>
          </Button>
          :
          routeName === "Profile" ?
          <Button rounded small light onPress={() => {
            navigation.navigate('Team Create')
            }}>
            <Text style={{fontSize: 10, fontWeight: 'bold'}}>NEW TEAM</Text>
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