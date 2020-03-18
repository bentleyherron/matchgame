import React, { useContext } from 'react';
import { Text, Button, Avatar, Toast } from 'native-base';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';
import axios from 'axios';

export default function PostEvent({
    setPage,
    challenge
}) {

    const { 
        team_from_id,
        datetime,
        wager,
        message,
        city_id,
        is_accepted,
        latitude,
        longitude,
        sport_id,
        title,
        id
       } = challenge;

    const date = datetime;
    const description = message;
    const {state, actions} = useContext(UserContext)
    const { userData, userToken, sportData } = state;
    const {setShouldRefresh} = actions;
    // THIS NEEDS TO BE UPDATED TO BE WHATEVER TEAM ACCEPTED THE CHALLENGE THROUGH MODAL
    const team_to_id = userData.teams[1].id;

    const eventObject = {
        eventTeams: [
            team_from_id,
            team_to_id
    ],
        event: {
            city_id,
            latitude,
            longitude,
            date,
            description,
            sport_id,
            is_public: true,
            wager,
            is_accepted: false,
            title
        }
    }

    const postEvent = async () => {
            const eventUrl = `${URL}/events/`;
            axios.post(eventUrl, eventObject, {headers: {"x-access-token": userToken}})
                .then(r => {
                    axios.put(`${URL}/challenges/`, {challenge:{id, team_to_id, is_accepted: true}}, {headers: {"x-access-token": userToken}})
                    .then(r => {
                        setPage(1);
                        // setShouldRefresh(currentState => !currentState);
                    })
                })
                .catch(() => {
                    Toast.show({
                        text: "Unable to submit",
                        buttonText: "Okay"
                    })
                    setTimeout(() => {
                        navigation.navigate('Feed')
                    }, 5000);
                }
                );
    }

    return(
        <Button
            rounded
            style={{backgroundColor: '#02A456'}}
            onPress={() => postEvent()}>
            <Text>Accept</Text>
        </Button>
    );
}