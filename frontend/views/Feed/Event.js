import React from 'react';
import {View, Text} from 'react-native';

export default function Event({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is an event!</Text>
        </View>
    );
}