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
    const [sportSelected, setSportSelected] = useState("All");
    const [currentChallengeArray, setCurrentChallengeArray] = useState(null);
    const { userData, userToken, sportData } = useContext(UserContext).state;
    let {favoriteSports} = userData;
    const pickerList = ["All", "Favorite Sports", ...favoriteSports];

    useEffect(() => {
        axios.get(`${URL}/challenges/city/${userData.userInfo.city_id}`, {
            headers: {
                "x-access-token": userToken
            }
        })
        .then((response) => {
            setChallengeArray(response.data);
            setCurrentChallengeArray(response.data);
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
            if (sportSelected === "All") {
                setCurrentChallengeArray(challengeArray);
            } else if (sportSelected === "Favorite Sports") {
                setCurrentChallengeArray(challengeArray.filter(obj => favoriteSports.find(el => el.sport_id === obj.sport_id)))
            } else {
                setCurrentChallengeArray(challengeArray.filter(obj => obj.sport_id === sportSelected))
            }
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
                        {pickerList.map(sport => 
                            <Picker.Item label={typeof sport === "string" ? sport : sportData[sport.sport_id - 1].name} value={typeof sport === "string" ? sport : sport.sport_id} key={uuid()} />
                        )}
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
