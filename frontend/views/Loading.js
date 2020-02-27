import React from 'react';
import {View, Text} from 'react-native';

export default function Loading({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is the loading page!</Text>
        </View>
    );
}