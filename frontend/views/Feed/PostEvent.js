import React, { useContext } from 'react';
import { Card, CardItem, H1, Text, Body, Left, Right, Button, Thumbnail, ListItem, Avatar } from 'native-base';
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
        sport_id
       } = challenge;

    const date = datetime;
    const description = message;
    const { userData } = useContext(UserContext).state;

    const team_to_id = userData.teams[0].team_id;

    const eventObject = {
        eventTeams: [
            team_from_id,
            team_to_id
    ],
        event: {
            team_id: 1,
            city_id,
            latitude,
            longitude,
            date,
            description,
            sport_id,
            is_public: true
        }
    }

    const postEvent = async () => {
        const eventUrl = `${URL}/events`;
        const eventResponse = await axios.post(eventUrl, eventObject);
        console.log(eventResponse.data.eventTeams);
        // setPage(1);
    }

    return(
        <Button
            rounded
            onPress={() => postEvent()}>
            <Text>Accept</Text>
        </Button>
    );
}