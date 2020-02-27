import React from 'react';
import {View, Text} from 'react-native';
import ProfilePage from './ProfilePage';

export default function ProfileContainer({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is the Profile Container</Text>
            <ProfilePage styles={styles} />
        </View>
    );
}