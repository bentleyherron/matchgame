import React, {useState, useEffect, useContext} from 'react';
import { Text, Button, Picker, Toast} from 'native-base';
import { Modal } from 'react-native';
import UserContext from '../../UserContext';
import ChallengeContext from './ChallengeContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';

export default function TeamSelectModal() {
    const [selectTeam, setSelectTeam] = useState(null);
    const {eventData, setShowModal, setEventData} = useContext(ChallengeContext);
    const {userData} = useContext(UserContext).state;
    const teamList = userData.teams.filter(team => ((team.sport_id === eventData.event.sport_id) && (team.captain_id === userData.userInfo.id)))
    const postEvent = async () => {
        if (selectTeam) {
            // creates new event from challenge
            const eventUrl = `${URL}/events/`;
            const eventObject = {
                eventTeams: [
                    eventData.eventTeams[0],
                    selectTeam
                ],
                event: eventData.event
            };
            axios.post(eventUrl, eventObject, {headers: {"x-access-token": userToken}})
                .then(r => {
                    // updates challenge to be accepted
                    axios.put(`${URL}/challenges/`, {challenge:{id: eventData.event.id, team_to_id: selectTeam, is_accepted: true}}, {headers: {"x-access-token": userToken}})
                    .then(r => {
                        setModalVisible(!modalVisible);
                        setPage(1);
                    })
                })
                .catch(() => {
                    Toast.show({
                        text: "Unable to submit",
                        buttonText: "Okay"
                    })
                    setTimeout(() => {
                        navigation.navigate('Feed')
                    }, 3000);
                }
                );
        } else {
            Toast.show({
                text: "Must select a team to continue",
                buttonText: "Okay",
                position: "top"
            })
        }
    }

    return (
        <Modal
          animationType="fade"
          visible={modalVisible}
        >
            <Content>
                <Text>Select a team</Text>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={selectTeam}
                    onValueChange={setSelectTeam}>
                        {teamList.map(team => 
                            <Picker.Item label={team.name} value={{eventTeam: {event_id:eventData.event.id, team_id: team.id}}} key={uuid()} />
                        )}
                </Picker>
                <Button
                onPress={() => {
                    postEvent();
                }}>
                    <Text>Submit</Text>
                </Button>
                <Button
                onPress={() => {
                    setEventData(null);
                    setModalVisible(!modalVisible);
                }}>
                    <Text>Cancel</Text>
                </Button>
            </Content>
        </Modal>
    );
  }