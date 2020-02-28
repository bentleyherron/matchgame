import React from 'react';
import { Content, Text } from 'native-base';
import Leaderboard from './Leaderboard';
import ChallengesContainer from './ChallengesContainer';
import EventsContainer from './EventsContainer';
import Search from './Search';

export default function FeedContainer(){
    return (
        <Content>
            <Search />
            <Text>This is the feed container.</Text>
            <Leaderboard />
            <ChallengesContainer />
            <EventsContainer />
        </Content>
    );
}