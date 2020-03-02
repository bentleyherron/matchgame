import React, { useState } from 'react';
import { Content, Header, Tab, Tabs } from 'native-base';
import Leaderboard from './Leaderboard';
import ChallengesContainer from './ChallengesContainer';
import EventsContainer from './EventsContainer';
import Search from './SearchContainer';

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
                <Tab heading="Search">
                    <Search />
                </Tab>
            </Tabs>
        </Content>
    );
}