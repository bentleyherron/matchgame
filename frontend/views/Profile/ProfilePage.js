import React from 'react';
import {View, Text} from 'react-native';

export default function ProfilePage({styles}){
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is your profile page</Text>
        </View>
    );
}