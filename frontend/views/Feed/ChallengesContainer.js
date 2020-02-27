import React from 'react';
import {View, Text} from 'react-native';
import Challenge from './Challenge';

export default function ChallengesContainer({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is the Challenges Container!</Text>
            <Challenge styles={styles} />
        </View>
    );
}
