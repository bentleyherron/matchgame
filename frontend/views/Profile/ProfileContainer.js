import React, { useState} from 'react';
import {View, Text} from 'react-native';
import UserProfile from './UserProfile';
import TeamProfile from './TeamProfile';
import Inbox from './Inbox/InboxContainer';
import { Container, Header } from 'native-base';

export default function ProfileContainer() {

    return (
        <Container>
            <Header/>
            {/* <Text>This is the Profile Container</Text> */}
            {/* <UserProfile/> */}
            {/* <TeamProfile/> */}
            <Inbox/>
        </Container>
    );
}