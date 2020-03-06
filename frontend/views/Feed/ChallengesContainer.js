import React, { useState, useEffect, useContext } from 'react';
import Challenge from './Challenge';
import { FlatList } from 'react-native';
import { Container, Spinner } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

export default function ChallengesContainer({setPage}) {

    const [challengeArray, setChallengeArray] = useState('');

    const { userData, favoriteSports } = useContext(UserContext).state;

    useEffect(() => {
        axios.get(`${URL}/challenges/city/${userData.userInfo.city_id}`)
            .then((response) => {
                console.log(response.data);
                console.log(userData.userInfo.city_id)
                setChallengeArray(response.data);
            })

    },[])

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
                    setPage={setPage}
                    />
                )}
                />
            ) : (
                <Spinner/>
            )}
        </Container>
    );
}
