import React, { useState, useEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { createStackNavigator } from '@react-navigation/stack';

import TeamCreateProfile from './TeamCreateProfile';
import TeamCreateReview from './TeamCreateReview';
import TeamMemberSelect from './TeamMemberSelect';

import UserContext from '../../UserContext';
import TeamContext from './TeamContext';

const Stack =  createStackNavigator();

export default function TeamCreateContainer({ navigation }) {
    const [teamName, setTeamName] = useState('');
    const [teamSport, setTeamSport] = useState(1);
    const [teamPhoto, setTeamPhoto] = useState('');
    const [teamMembers, setTeamMembers] = useState({});

    const handleTeamMemberAdd = (id, username) => {
        if(teamMembers[id]) {
            const newTeamMembers = {...teamMembers};
            delete newTeamMembers[id];
            setTeamMembers(newTeamMembers);
        } else {
            const newTeamMembers = {...teamMembers};
            newTeamMembers[id] = username;
            setTeamMembers(newTeamMembers);
        }
    }

    const imagePickerAsync = async() => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if(permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true, quality: 0.5, aspect:[100, 100]});

        if(pickerResult.cancelled === true) {
            return;
        }

        setTeamPhoto("data:image/png;base64," + pickerResult.base64);
    }

    const TeamContextValue = {
        state:{
            teamName,
            teamSport,
            teamPhoto,
            teamMembers
        },
        actions: {
            setTeamName,
            setTeamSport,
            imagePickerAsync,
            handleTeamMemberAdd
        }
    }

    return(
        <TeamContext.Provider value={TeamContextValue}>
            <Stack.Navigator initialRouteName="teamProfile">
                <Stack.Screen name="teamProfile" component={TeamCreateProfile} options={{title: "Create Team Profile"}} />
                <Stack.Screen name="teamMemberSelect" component={TeamMemberSelect} options={{title: "Select Team Members"}} />
                <Stack.Screen name="teamReview" component={TeamCreateReview} options={{title: "Review Team Information"}} />
            </Stack.Navigator>
        </TeamContext.Provider>
    );
}
