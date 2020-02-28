import React from 'react';
import UserProfile from './UserProfile';
import TeamProfile from './TeamProfile';
import Inbox from './Inbox';
import { Content, Text } from 'native-base';

export default function ProfileContainer({styles}) {
    return (
        <Content>
            <Text>This is the Profile Container</Text>
            <UserProfile />
            <TeamProfile />
            <Inbox />
        </Content>
    );
}