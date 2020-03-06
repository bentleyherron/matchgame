import React, { useState } from 'react';
import { Container, Content, Header, Tab, Tabs } from 'native-base';
import Leaderboard from './Leaderboard';
import ChallengesContainer from './ChallengesContainer';
import EventsContainer from './EventsContainer';
import Search from './SearchContainer';

export default function FeedContainer(){

    const [page, setPage] = useState(0);

    return (
        <Container>
            <Header hasTabs/>
            <Tabs page={page}>
                <Tab heading="Challenges">
                    <ChallengesContainer 
                        setPage={setPage}
                    />
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