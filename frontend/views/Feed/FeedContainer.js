import React, { useState } from 'react';
import { Container, Content, Header, Tab, Tabs } from 'native-base';
import Leaderboard from './Leaderboard';
import ChallengesContainer from './ChallengesContainer';
import EventsContainer from './EventsContainer';
import Search from './SearchContainer';

export default function FeedContainer(){
    return (
        <Container>
            <Header hasTabs/>
            <Tabs>
                <Tab heading="Challenges">
                    <ChallengesContainer />
                </Tab>
                <Tab heading="Events">
                    <EventsContainer />
                </Tab>
                <Tab heading="Leaders">
                    <Leaderboard />
                </Tab>
                <Tab heading="Search">
                    <Search />
                </Tab>
            </Tabs>
        </Container>
    );
}