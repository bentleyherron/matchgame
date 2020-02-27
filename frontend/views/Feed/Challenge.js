import React from 'react';
import {View, Text} from 'react-native';

export default function Challenge({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is a challenge!</Text>
        </View>
    );
}