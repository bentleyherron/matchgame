import React, { useState, useEffect, useContext } from 'react';
import Challenge from './Challenge';
import { FlatList } from 'react-native';
import { Container, Spinner, Toast } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

export default function ChallengesContainer({setPage, route, page}) {
    const [challengeArray, setChallengeArray] = useState(null);
    const { userData, userToken } = useContext(UserContext).state;
    // get team name from challenge
    useEffect(() => {
        axios.get(`${URL}/challenges/city/${userData.userInfo.city_id}`, {
            headers: {
                "x-access-token": userToken
            }
        })
        .then((response) => {
            setChallengeArray(response.data);
        })
        .catch(() => {
            Toast.show({
                text: "Unable to access challenges",
                buttonText: "Okay"
            })
            setTimeout(() => {
                navigation.navigate('Signup')
            }, 5000)
        })
    },[route.params, page])

    return (
        <Container>
            {challengeArray ? (
                <FlatList
                data={challengeArray}
                renderItem={ ({ item }) => (
                    <Challenge
                    keyExtractor={item.id}
                    challenge={item}
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
