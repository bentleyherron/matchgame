import React from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
export default function Nav( {navigation}) {
  return (
      <Footer>
        <FooterTab>
          <Button onPress={() => {navigation.navigate('Feed')}}>
            <Icon type="FontAwesome" name="fire"/>
            <Text>Feed</Text>
          </Button>
          <Button onPress={() => {navigation.navigate('Challenge Create')}}>
            <Icon type="AntDesign" name="pluscircle" />
          </Button>
          <Button onPress={() => {navigation.navigate('Profile')}}>
            <Icon type="FontAwesome" name='user'/>
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
  );
}