import React from 'react';
import {View, Text} from 'react-native';

export default function EventsContainer({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is the Events Container!</Text>
        </View>
    );
}