import React, { useState } from 'react';
import { Button, Text } from 'native-base';
import axios from 'axios';

import {URL} from 'react-native-dotenv';

export default function ButtonCreateChallenge({
    sport_id,
    wager,
    message,
    datetime,
    team_from_id,
    city_id,
    latitude,
    longitude,
    navigation
}) {

    const challengeObject = {
        challenge: {
            sport_id,
            datetime,
            wager,
            message,
            team_from_id,
            city_id,
            latitude,
            longitude
        }
    }

    const postChallenge = async () => {
        const url = `${URL}/challenges`
        console.log(url);
        console.log(challengeObject);
        const response = await axios.post(url, challengeObject);
        
    }

    return (
        <Button
            onPress={() => {
                postChallenge();
                navigation.navigate('Feed');
            }}>
            <Text>Post Challenge</Text>
        </Button>

    );
}