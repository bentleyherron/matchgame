import React, { useState, useEffect, useContext } from 'react';
import Challenge from './Challenge';
import SelectTeamModal from './SelectTeamModal';
import { FlatList } from 'react-native';
import { Container, Content, Spinner, Toast, Picker, Icon } from 'native-base';
import uuid from 'react-uuid';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';
import ChallengeContext from './ChallengeContext';

export default function ChallengesContainer({setPage, route, page}) {
    // sets states
    const [challengeArray, setChallengeArray] = useState(null);
    const [sportSelected, setSportSelected] = useState("All");
    const [currentChallengeArray, setCurrentChallengeArray] = useState(null);
    const [eventData, setEventData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    // grabs user data
    const { userData, userToken, sportData } = useContext(UserContext).state;
    let {favoriteSports} = userData;

    // sets up picker list
    const pickerList = ["All", "Favorite Sports", ...favoriteSports];

    // grabs all challenges from api
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

    // filters challenges based upon sport picked
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


    // loading
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
            <ChallengeContext.Provider value={eventData, setEventData, setShowModal} >
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
                    {showModal ? <SelectTeamModal /> : null}
                </Content>
            </ChallengeContext.Provider>
        </Container>
    );
}
