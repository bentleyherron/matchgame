import React, { useState} from 'react';
import UserProfile from './UserProfile';
import TeamProfile from './TeamProfile';
import Inbox from './Inbox/InboxContainer';
import { Container, Header, Tab, Tabs } from 'native-base';

export default function ProfileContainer() {

    return (
        <Container>
            <Header hasTabs />
            <Tabs>
                <Tab heading="User Profile">
                    <UserProfile/>
                </Tab>
                <Tab heading="Team Profile">
                    <TeamProfile/>
                </Tab>
                <Tab heading="Inbox">
                    <Inbox/>
                </Tab>
            </Tabs>
        </Container>
    );
}