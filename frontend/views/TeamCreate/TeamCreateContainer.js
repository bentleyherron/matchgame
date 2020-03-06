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
    const [teamSport, setTeamSport] = useState('');
    const [teamPhoto, setTeamPhoto] = useState('');
    const [teamMembers, setTeamMembers] = useState({});

    const handleTeamMemberAdd = (id, username) => {
        if(teamMembers[id]) {
            const newTeamMembers = {...teamMembers};
            delete newTeamMembers[id];
            setTeamMembers(newTeamMembers);
        } else {
            setTeamMembers({...teamMembers, id: username})
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

// team name
// team region
// team captain (is user)
// team sport
// rating (posted as 5 automatically)
// photo
// is_solo (false)
// team_members

// one page = name, sport, photo
// second page = members
// third page = review and submit (post team id and then post team_members) first get team id, then post each member to database as that team id

// create container to hold three pages and navigate through them (stack navigator)
// then create each individual page and form (copy from user signup)
// then put team creation to + button functionality
