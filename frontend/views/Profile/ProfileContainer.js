import React from 'react';
import UserProfile from './UserProfile';
import TeamProfile from './TeamProfile';
import ProfileHeader from '../Navigation/ProfileHeader';
import UserUpdate from './UserUpdate/UserUpdate';
import UpdateCity from './UserUpdate/UpdateCity';
import UpdateSports from './UserUpdate/UpdateSports';
import UpdateTeam from './TeamUpdate';
import UpdateTeamMembers from './TeamMemberUpdate';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function ProfileContainer() {

    return (
        <Stack.Navigator initialRouteName="User Profile" screenOptions={{header: props => <ProfileHeader {...props} />}} >
            <Stack.Screen name="User Profile" component={UserProfile} />
            <Stack.Screen name="Team Profile" component={TeamProfile} />
            <Stack.Screen name="User Update" component={UserUpdate} />
            <Stack.Screen name="City Update" component={UpdateCity} />
            <Stack.Screen name="Sport Update" component={UpdateSports} />
            <Stack.Screen name="Team Update" component={UpdateTeam} />
            <Stack.Screen name="Member Update" component={UpdateTeamMembers} />
        </Stack.Navigator>
    );
}