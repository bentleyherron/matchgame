import React from 'react';
import {View, Text} from 'react-native';
import Leaderboard from './Leaderboard';

export default function FeedContainer({styles}){
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is the feed container.</Text>
            <Leaderboard styles={styles} />
        </View>
    );
}