import React, { useContext } from 'react';
import { Card, CardItem, H1, Text, Body, Left, Right, Button, Thumbnail, ListItem, Avatar, Toast } from 'native-base';
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
        title
       } = challenge;

    const date = datetime;
    const description = message;
    const {state, actions} = useContext(UserContext)
    const { userData, userToken, sportData } = state;
    const {setShouldRefresh} = actions;
    const team_to_id = userData.teams[0].id;

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
        try{
            const eventUrl = `${URL}/events/`;
            const eventResponse = await axios.post(eventUrl, eventObject, {
                headers: {
                  "x-access-token": userToken
                }
              });
            setPage(1);
            // setShouldRefresh(currentState => !currentState);

        }catch(err){
                Toast.show({
                    text: "Unable to submit",
                    buttonText: "Okay"
                })
                setTimeout(() => {
                    navigation.navigate('Feed')
                }, 5000);
        }
    }

    return(
        <Button
            rounded
            onPress={() => postEvent()}>
            <Text>Accept</Text>
        </Button>
    );
}