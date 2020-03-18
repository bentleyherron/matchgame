import React, { useState, useEffect, useContext } from 'react';
import Challenge from './Challenge';
import { FlatList } from 'react-native';
import { Container, Content, Spinner, Toast, Picker, Icon } from 'native-base';
import uuid from 'react-uuid';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

export default function ChallengesContainer({setPage, route, page}) {
    const [challengeArray, setChallengeArray] = useState(null);
    const [sportSelected, setSportSelected] = useState(null);
    const [currentChallengeArray, setCurrentChallengeArray] = useState(null);
    const { userData, userToken, sportData } = useContext(UserContext).state;
    let {favoriteSports} = userData;
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

    useEffect(() => {
        if (challengeArray) {
            setCurrentChallengeArray(challengeArray.filter(obj => obj.sport_id === sportSelected))
        }
    }, [sportSelected]);

    if (!challengeArray) {
        return (
            <Container>
                <Content>
                    <Spinner />
                </Content>
            </Container>
        )
    }
    return (
        <Container>
            <Content>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Favorite Sport"
                    selectedValue={sportSelected}
                    onValueChange={setSportSelected}>
                        {favoriteSports ? favoriteSports.map(sport => (
                            <Picker.Item label={sportData[sport.sport_id - 1].name} value={sport.sport_id} key={uuid()} />
                        )) : null}
                </Picker>
                <FlatList
                    data={currentChallengeArray}
                    renderItem={ ({ item }) => (
                        <Challenge
                        keyExtractor={uuid()}
                        challenge={item}
                        setPage={setPage}
                        />
                    )}
                />
            </Content>
        </Container>
    );
}
