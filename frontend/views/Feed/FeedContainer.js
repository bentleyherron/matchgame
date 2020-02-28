import React, { useState } from 'react';
import { Content, Header, Tab, Tabs, TabHeading, Text } from 'native-base';
import Leaderboard from './Leaderboard';
import ChallengesContainer from './ChallengesContainer';
import EventsContainer from './EventsContainer';
import Search from './Search';

export default function FeedContainer(){
    return (
        <Content>
            <Header hasTabs/>
            <Tabs>
                <Tab heading="Leaderboard">
                    <Leaderboard />
                </Tab>
                <Tab heading="Challenges">
                    <ChallengesContainer />
                </Tab>
                <Tab heading="Events">
                    <EventsContainer />
                </Tab>
            </Tabs>
        </Content>
    );
}