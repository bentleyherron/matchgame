import React from 'react';
import {View, Text} from 'react-native';

export default function Search({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is the search bar!</Text>
        </View>
    );
}