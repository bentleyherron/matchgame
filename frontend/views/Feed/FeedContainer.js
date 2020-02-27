import React from 'react';
import {View, Text} from 'react-native';

export default function FeedContainer({styles}){
    return (
        <View style={styles.container}>
            <Text style={styles.instruction}>This is the feed container.</Text>
        </View>
    );
}