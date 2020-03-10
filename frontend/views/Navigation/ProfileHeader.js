import React from 'react';
import { Header, Left, Body, Right, Button, Text } from 'native-base';
export default function ProfileHeader({navigation}) {
    return (
        <Header style={{height: 50, flexDirection: 'row', justifyContent:"space-around", borderWidth:1, paddingBottom:25, paddingTop: 80}}>
              <Left>
                  <Button onPress={() => navigation.navigate('User Profile')}>
                      <Text>User Profile</Text>
                  </Button>
              </Left>
              <Right>
                  <Button onPress={() => navigation.navigate('Team Profile')}>
                      <Text>
                          Team Profile
                      </Text>
                  </Button>
              </Right>
        </Header>
    );
}