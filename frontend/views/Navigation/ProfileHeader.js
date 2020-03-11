import React from 'react';
import { Header, Left, Body, Right, Button, Text } from 'native-base';
export default function ProfileHeader({navigation}) {
    return (
        <Header style={{height: 50, flexDirection: 'row', justifyContent:"space-around", borderWidth:1, paddingBottom:25, paddingTop: 80}}>
            <Button transparent onPress={() => navigation.navigate('User Profile')}>
                <Text>Your Profile</Text>
            </Button>
            <Button transparent onPress={() => navigation.navigate('Team Profile')}>
                <Text>
                    Your Teams
                </Text>
            </Button>
        </Header>
    );
}