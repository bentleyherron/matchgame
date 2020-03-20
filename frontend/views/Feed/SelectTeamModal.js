import React, {useState, useEffect, useContext} from 'react';
import { Container, Card, CardItem, Text, Button, Picker, Toast, Content, Icon} from 'native-base';
import { Modal, StyleSheet, View } from 'react-native';
import UserContext from '../../UserContext';
import ChallengeContext from './ChallengeContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import uuid from 'react-uuid';

export default function TeamSelectModal() {
    const {eventData, setShowModal, setEventData, showModal} = useContext(ChallengeContext);
    const {userData, userToken} = useContext(UserContext).state;
    const teamList = userData.teams.filter(team => ((team.sport_id === eventData.event.sport_id) && (team.captain_id === userData.userInfo.id)))
    // must have selectTeam after teamList due to constructor
    const [selectTeam, setSelectTeam] = useState(teamList[0].id);
    console.log(selectTeam);
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
            console.log(eventObject);
            axios.post(eventUrl, eventObject, {headers: {"x-access-token": userToken}})
                .then(r => {
                    // updates challenge to be accepted
                    axios.put(`${URL}/challenges/`, {challenge:{id: eventData.event.id, team_to_id: selectTeam, is_accepted: true}}, {headers: {"x-access-token": userToken}})
                    .then(r => {
                        console.log(r);
                        setShowModal(false);
                        setPage(1);
                    })
                })
                .catch((err) => {
                    console.log(err);
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
            flex: 1,
            flexDirection: "column",
            backgroundColor: 'rgba(0,0,0,.5)',
            paddingTop: 180
        },
        modalText: {
            textAlign: "center",
            backgroundColor: "white",
            opacity: 1
        },
        modalButtons: {
            padding: 15,
            marginTop: 5,
            borderRadius: 15,
            backgroundColor: '#fafafa',
            justifyContent: "space-around",
            opacity: 1
        },
        modalButtonAccept: {
            padding: 15,
            marginTop: 5,
            borderRadius: 15,
            backgroundColor: '#02A456',
            marginRight: 10
        },
        modalCard: {
            padding: 15,
            borderRadius: 15,
            backgroundColor: "white",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            opacity: 1
        },
        buttonArea: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: "white"
        }
    });

    return (
        <Container>
            <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            >
                <Content contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} style={styles.modalContainer}>
                    <Card style={styles.modalCard}>
                        <CardItem>
                            <Text style={styles.modalText}>Which team should accept the challenge?</Text>
                        </CardItem>
                        <CardItem>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                selectedValue={selectTeam}
                                onValueChange={setSelectTeam}>
                                    {teamList.map(team => 
                                        <Picker.Item label={team.name} value={team.id} key={uuid()} />
                                    )}
                            </Picker>
                        </CardItem>
                        <View style={styles.buttonArea}>
                            <Button
                            style={styles.modalButtonAccept}
                            onPress={() => {
                                postEvent();
                            }}>
                                <Text style={{color: "white"}}>Submit</Text>
                            </Button>
                            <Button
                            style={styles.modalButtons}
                            onPress={() => {
                                setEventData(null);
                                setShowModal(false);
                            }}>
                                <Text style={{color: "black"}}>Cancel</Text>
                            </Button>
                        </View>
                    </Card>
                </Content>          
            </Modal>
        </Container>
    );
  }