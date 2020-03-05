import React, { useState } from 'react';
import { Button, Text } from 'native-base';
import axios from 'axios';

export default function ButtonCreateChallenge({
    sport,
    location,
    wager,
    description,
    datetime
}) {

    const [challengeObject, setChallengeObject] = useState({
        challenge: {
            sport,
            datetime,
            wager,
            description
        }
    })

    const postChallenge = async () => {
        const url = `https://8ab0e3a4.ngrok.io/challenges`
        const response = await axios.post(url, challengeObject);
    }

    return (
        <Button
            onPress={() => {
                postChallenge()
            }}>
            <Text>Post Challenge</Text>
        </Button>

    );
}