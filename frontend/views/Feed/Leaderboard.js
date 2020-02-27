import React from 'react';
import {View, Text} from 'react-native';

export default function Leaderboard({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is the leaderboard!</Text>
        </View>
    );
}