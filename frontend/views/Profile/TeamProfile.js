import React from 'react';
import {View, Text} from 'react-native';

export default function TeamProfile({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>Here is the team profile.</Text>
        </View>
    );
}