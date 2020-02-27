import React from 'react';
import {View, Text} from 'react-native';

export default function Nav({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>Here is the nav bar.</Text>
        </View>
    );
}