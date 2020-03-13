import React, {useState, useContext} from 'react';
import { Container, Content, List, ListItem, Left, Body, Text, Spinner, Footer, FooterTab, Button, Toast, Thumbnail } from 'native-base';
import {Image} from 'react-native';
import TeamContext from './TeamContext';
import UserContext from '../../UserContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import uuid from 'react-uuid';

export default function TeamCreateReview( {navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { teamName, teamSport, teamPhoto, teamMembers } = useContext(TeamContext).state
    const { userData, sportData, userToken } = useContext(UserContext).state;
    const {setShouldRefresh} = useContext(UserContext).actions;

    const convertTeamMembers = (obj) => {
        const newArr = Object.keys(obj).map(item => {return {id: item, name: obj[item]}});
        return newArr;
    }

    const postTeamMembers = async (teamId) => {
        let addTeamMembers = {teamMembers:Object.keys(teamMembers).map(item => {return {player_id: item, team_id:teamId}})};
        axios.post(`${URL}/team-members/`, addTeamMembers, {headers:{"x-access-token": userToken}})
        .catch(() => {
            Toast.show({
                text: "Error occurred. Try again later",
                buttonText: "Okay"
            });
            setTimeout(() => {
                navigation.navigate('Signup')
            }, 5000);
        })
    }

    const postNewTeam = async () => {
            setIsSubmitting(true);
            axios.post(`${URL}/teams/`, {
                "team": {
                    "name": teamName,
                    "city_id": userData.userInfo.city_id,
                    "captain_id": userData.userInfo.id,
                    "sport_id": teamSport,
                    "rating": 5,
                    "photo": teamPhoto,
                    "is_solo": false
                }
            }, {headers:{"x-access-token": userToken}})
            .then(
                r => {
                    postTeamMembers(r.data.id)
                    .then(
                        r => {
                            setIsSubmitting(false);
                            navigation.navigate('User Profile');
                            setShouldRefresh(currentState => !currentState);
                        }
                    )
                }
            )
            .catch(() => {
                Toast.show({
                    text: "Error occurred. Try again later",
                    buttonText: "Okay"
                });
                setTimeout(() => {
                    navigation.navigate('Signup')
                }, 5000);
            })
        }

    return(
        <Container>
            <Content>
                <List>
                    <ListItem>
                        <Left>
                            <Text>
                                Team Name:
                            </Text>
                        </Left>
                        <Body>
                            <Text>
                                {teamName}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                Sport:
                            </Text>
                        </Left>
                        <Body>
                            <Text>
                                {sportData ? sportData[teamSport - 1].name: null}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Picture:</Text>
                        </Left>
                        <Body>
                            <Thumbnail large source={{uri: teamPhoto}} />
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Captain:</Text>
                        </Left>
                        <Body>
                            <Text>{userData.userInfo.username}</Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                Team Members:
                            </Text>
                        </Left>
                        <Body>
                            <List>
                                {teamMembers ? convertTeamMembers(teamMembers).map(member => (
                                        <Text key={uuid()}>{member ? member.name : null}</Text>
                                )) : null}
                            </List>
                        </Body>
                    </ListItem>
                </List>
                {isSubmitting ? <Spinner /> : null}
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                    onPress={() => {navigation.goBack()}}
                    >
                        <Text style={{fontSize: 15}}>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={async () => {
                        postNewTeam();
                    }}
                    >
                        <Text style={{fontSize: 15}}>SUBMIT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    
    )
}