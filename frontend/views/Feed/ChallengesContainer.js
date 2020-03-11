import React, { useState, useEffect, useContext } from 'react';
import Challenge from './Challenge';
import { FlatList } from 'react-native';
import { Container, Spinner } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

export default function ChallengesContainer({setPage, route}) {
    const [challengeArray, setChallengeArray] = useState(null);
    
    const { userData, favoriteSports, userToken } = useContext(UserContext).state;
    
    // correct path but need to make cities the same for debugging

    // useEffect(() => {
    //     axios.get(`${URL}/challenges/city/${userData.userInfo.city_id}`, {
    //         headers: {
    //             "x-access-token": userToken
    //         }
    //     })
    //     .then((response) => {
    //         setChallengeArray(response.data);
    //     })
        
    // },[route.params])

    useEffect(() => {
        try{
            axios.get(`${URL}/challenges/city/11`, {
                headers: {
                    "x-access-token": userToken
                }
            })
            .then((response) => {
                setChallengeArray(response.data);
            })
        }catch(err) {
            console.log(err);
        }
    },[])

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
