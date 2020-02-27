import React from 'react';
import {View, Text} from 'react-native';
import Event from './Event';

export default function EventsContainer({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is the Events Container!</Text>
            <Event styles={styles} />
        </View>
    );
}