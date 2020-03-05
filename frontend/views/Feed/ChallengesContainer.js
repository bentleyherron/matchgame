import React, { useState, useEffect } from 'react';
import Challenge from './Challenge';
import { FlatList } from 'react-native';
import { Container, Spinner } from 'native-base';
import axios from 'axios';

import {URL} from 'react-native-dotenv';

export default function ChallengesContainer() {

    const [challengeArray, setChallengeArray] = useState('');

    useEffect(() => {
        axios.get(`${URL}/challenges`)
            .then((response) => {
                console.log(response.data);
                setChallengeArray(response.data);
            })
    },[])

    const challenge1 = {
        id: 1,
        teamFrom: 'Shark',
        teamTo: 'Dolphin',
        date: new Date("2018-3-20"),
        message: 'We are going to school you guys!',
        wager: 100,
        isAccepted: false
    };

    const challenge2 = {
        id: 2,
        teamFrom: 'Team Rocket',
        teamTo: 'Psyduck',
        date: new Date("2004-2-14"),
        message: 'Blasting off at the speed of light!',
        wager: 100,
        isAccepted: false
    };

    const challenge3 = {
        id: 3,
        teamFrom: 'Your Mom',
        teamTo: 'Chad',
        date: new Date('2020-2-14'),
        message: 'This is getting interesting!',
        wager: 100,
        isAccepted: false
    };

    expandChallenge = () => {
        console.log('you clicked the challenge');
    }

    return (
        <Container>
            {challengeArray ? (
                <FlatList
                data={challengeArray}
                renderItem={ ({ item }) => (
                    <Challenge
                    keyExtractor={item.id}
                    challenge={item}
                    expandChallenge={expandChallenge}
                    />
                )}
                />
            ) : (
                <Spinner/>
            )}
        </Container>
    );
}
