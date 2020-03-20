import React, { useContext } from 'react';
import { Text, Button, Toast } from 'native-base';
import UserContext from '../../UserContext';
import ChallengeContext from './ChallengeContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';

export default function PostEvent({ setPage, challenge }) {
    // destructure challenge for readability
    const { 
        team_from_id,
        datetime,
        wager,
        message,
        city_id,
        latitude,
        longitude,
        sport_id,
        title,
        id
    } = challenge;
    // rename variables
    const date = datetime;
    const description = message;

    // grab userData and actions from user context
    const {state, actions} = useContext(UserContext)
    const { userData, userToken, sportData } = state;
    const {setShouldRefresh} = actions;

    // grab context from challenge context
    const {setEventData, setShowModal} = useContext(ChallengeContext);
    const postEvent = async (eventObject) => {
            // creates new event from challenge
            const eventUrl = `${URL}/events/`;
            axios.post(eventUrl, eventObject, {headers: {"x-access-token": userToken}})
                .then(r => {
                    // updates challenge to be accepted
                    axios.put(`${URL}/challenges/`, {challenge:{id, team_to_id: eventObject.eventTeams[1], is_accepted: true}}, {headers: {"x-access-token": userToken}})
                    .then(r => {
                        setPage(1);
                        // setShouldRefresh(currentState => !currentState);
                    })
                })
                .catch((err) => {
                    Toast.show({
                        text: "Unable to submit",
                        buttonText: "Okay"
                    })
                }
                );
    }

    const handlePost = () => {
        const teamList = userData.teams.filter(team => ((team.sport_id === sport_id) && (team.captain_id === userData.userInfo.id)))
        if (teamList.length === 1) {
            const team_to_id = teamList[0].id
            const eventObject = {
                eventTeams: [
                    team_from_id,
                    team_to_id
            ],
                event: {
                    city_id,
                    latitude,
                    longitude,
                    date,
                    description,
                    sport_id,
                    is_public: true,
                    wager,
                    is_accepted: true,
                    title
                }
            }
            postEvent(eventObject);
        } else if (teamList.length > 1) {
            const eventObject = {
                eventTeams: [
                    team_from_id
            ],
                event: {
                    city_id,
                    latitude,
                    longitude,
                    date,
                    description,
                    sport_id,
                    is_public: true,
                    wager,
                    is_accepted: false,
                    title
                }};
            setEventData(eventObject);
            setShowModal(true);

        } else {
            Toast.show({
                text: "Error occurred",
                buttonText: "Okay",
                position: "top"
            })
        }
    }

    return(
        <Button
            rounded
            style={{backgroundColor: '#02A456'}}
            onPress={() => handlePost()}>
            <Text>Accept</Text>
        </Button>
    );
}