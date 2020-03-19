import React, {useState, useEffect, useContext} from 'react';
import { Container, Text, Button, Picker, Toast, Content, Icon} from 'native-base';
import { Modal, StyleSheet } from 'react-native';
import UserContext from '../../UserContext';
import ChallengeContext from './ChallengeContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import uuid from 'react-uuid';

export default function TeamSelectModal() {
    const [selectTeam, setSelectTeam] = useState(null);
    const {eventData, setShowModal, setEventData, showModal} = useContext(ChallengeContext);
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
                        setShowModal(false);
                        setPage(1);
                    })
                })
                .catch(() => {
                    Toast.show({
                        text: "Unable to submit",
                        buttonText: "Okay"
                    })
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

    const styles = StyleSheet.create({
        modalContainer: {
            paddingVertical: 40,
            flexDirection: "column",
            backgroundColor: 'black',
            opacity: .5,
            zIndex: 1
        },
        modalText: {
            textAlign: "center",
            backgroundColor: "white",
            opacity: 1,
            zIndex: 2
        },
        modalPicker: {
            backgroundColor: "white",
            opacity: 1,
            zIndex: 2
        },
        modalButtons: {
            padding: 15,
            marginTop: 5,
            borderRadius: 15,
            backgroundColor: '#fafafa',
            justifyContent: "space-around",
            opacity: 1,
            zIndex: 2
        },
    });

    return (
        <Container>
            <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            >
                <Content style={styles.modalContainer}>
                    <Text style={styles.modalText}>Which team should accept the challenge?</Text>
                    <Picker
                        style={styles.modalPicker}
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        selectedValue={selectTeam}
                        onValueChange={setSelectTeam}>
                            {teamList.map(team => 
                                <Picker.Item style={{textAlign: "center"}} label={team.name} value={{eventTeam: {event_id:eventData.event.id, team_id: team.id}}} key={uuid()} />
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
                        setShowModal(false);
                    }}>
                        <Text>Cancel</Text>
                    </Button>
                </Content>          
            </Modal>
        </Container>
    );
  }