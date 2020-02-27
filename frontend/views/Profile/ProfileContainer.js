import React from 'react';
import {View, Text} from 'react-native';
import UserProfile from './UserProfile';
import TeamProfile from './TeamProfile';

export default function ProfileContainer({styles}) {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>This is the Profile Container</Text>
            <UserProfile styles={styles} />
            <TeamProfile styles={styles} />
        </View>
    );
}