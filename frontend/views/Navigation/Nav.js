import React from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
export default function Nav() {
  const navigation = useNavigation();
  return (
      <Footer>
        <FooterTab>
          <Button onPress={() => {navigation.navigate('Profile')}}>
            <Text>Profile</Text>
          </Button>
          <Button>
            <Icon type="AntDesign" name="pluscircle" />
          </Button>
          <Button onPress={() => {navigation.navigate('Feed')}}>
            <Text>Feed</Text>
          </Button>
        </FooterTab>
      </Footer>
  );
}