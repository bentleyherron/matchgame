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

    const eventObject = {
        event: {
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
        const url = `${URL}/events`;
        console.log(url);
        // console.log(userData);
        console.log(eventObject);
        const response = await axios.post(url, eventObject);
    }

    return(
        <Button
            rounded
            onPress={() => postEvent()}>
            <Text>Accept</Text>
        </Button>
    );
}