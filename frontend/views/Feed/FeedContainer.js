import React from 'react';
import {View, Text} from 'react-native';
import Leaderboard from './Leaderboard';
import ChallengesContainer from './ChallengesContainer';
import EventsContainer from './EventsContainer';
import Search from './Search';

export default function FeedContainer({styles}){
    return (
        <View style={styles.container}>
            <Search styles={styles} />
            <Text style={styles.instructions}>This is the feed container.</Text>
            <Leaderboard styles={styles} />
            <ChallengesContainer styles={styles} />
            <EventsContainer styles={styles} />
        </View>
    );
}