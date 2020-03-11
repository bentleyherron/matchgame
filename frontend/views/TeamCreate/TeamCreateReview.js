import React, {useState, useContext} from 'react';
import { Container, Content, List, ListItem, Left, Body, Text, Spinner, Footer, FooterTab, Button } from 'native-base';
import {Image} from 'react-native';
import TeamContext from './TeamContext';
import UserContext from '../../UserContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';

export default function TeamCreateReview( {navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { teamName, teamSport, teamPhoto, teamMembers } = useContext(TeamContext).state
    const { userData, sportData, userToken } = useContext(UserContext).state;
    const {setShouldRefresh} = useContext(UserContext).actions;
    const convertTeamMembers = (obj) => {
        const newArr = Object.keys(obj).map(item => {return {id: item, name: obj[item]}});
        return newArr;
    }

    const postNewTeam = async () => {
        const result = await axios.post(`${URL}/teams/`, {
            "team": {
                "name": teamName,
                "city_id": userData.userInfo.city_id,
                "captain_id": userData.userInfo.id,
                "sport_id": teamSport,
                "rating": 5,
                "photo": teamPhoto,
                "is_solo": false
            }
        }, {headers:{"x-access-token": userToken}});
        return false;
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
                            <Image style={{width: 100, height: 100}} source={{uri: teamPhoto}} />
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
                                {convertTeamMembers(teamMembers).map(member => (
                                        <Text key={member.id+"member"}>{member.name}</Text>
                                ))}
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
                        <Text>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={async () => {
                        setIsSubmitting(true);
                        const wasSubmitted = await postNewTeam();
                        setIsSubmitting(wasSubmitted);
                        if(!wasSubmitted){
                            navigation.navigate('User Profile') 
                            setShouldRefresh(currentState => !currentState)
                        } else{
                            console.log('error in submission');
                        }
                    }}
                    >
                        <Text>Submit</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    
    )
}