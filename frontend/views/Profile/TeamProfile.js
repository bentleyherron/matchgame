import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Grid, Row, Col, Thumbnail, Body, Text, Button, H1, H2, H3, Accordion, Spinner, Item, Picker, Icon, Toast } from 'native-base';

import axios from 'axios';
import { URL } from 'react-native-dotenv';
import uuid from 'react-uuid';
import UserContext from '../../UserContext';

export default function TeamProfile({navigation}){
    const { userData, sportData, userToken } = useContext(UserContext).state;
    const [isCaptain, setIsCaptain] = useState(false);
    const [teamData, setTeamData] = useState(null);
    const [teamSelected, setTeamSelected] = useState(null);

    const checkCaptainAndSport = () => {
        const captainObj = {};
        userData.teams.forEach((team) => {
          if(team.captain_id === userData.userInfo.id) {
            captainObj[team.id] = true ;
          }
        })
        setIsCaptain(captainObj);
    }

    const deleteTeam = async () => {

    }

    const getUniques = (arr, keyToCheck) => {
        return arr.filter((obj, i) => arr.findIndex(el => el[keyToCheck] === obj[keyToCheck]) === i) 
    }

    const fetchTeamProfileData = async () => {
        try{
            const teamArr = getUniques(userData.teams, "id");
            if(teamArr.length > 1) {
                const dataResults = await Promise.all(teamArr.slice(1).map(async teamObj => {
                    const teamProfile = await axios.get(`${URL}/profile/team/${teamObj.id}/`, {
                        headers: {
                          "x-access-token": userToken
                        }});
                    return teamProfile.data;
                }));
                setTeamData(dataResults);
                setTeamSelected(dataResults[0]);
            } else {
                const dataResults = await axios.get(`${URL}/profile/team/${teamArr[0].id}/`, {
                        headers: {
                          "x-access-token": userToken
                        }});
                setTeamData(dataResults);
                setTeamSelected(dataResults)
            }
        }catch(err) {
            Toast.show({
                text: "Error occurred. Try again later",
                buttonText: "Okay"
            });
            setTimeout(() => {
                navigation.navigate('Signup')
            }, 5000);

        }
    }

    useEffect(() => {
        fetchTeamProfileData();
    },[])

    useEffect(() => {
        checkCaptainAndSport();
    }, [])



    if(!teamData) {
        return(
        <Container>
            <Content>
                <Spinner />
            </Content>
        </Container>
        )
    }

    const styles = StyleSheet.create({
        container: {
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: '#fafafa'
        },
        pickerContainer : {
            marginBottom: 15,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'center'
        },
        profileHeaderContainer : {
            // marginBottom: 15,
            borderRadius: 15,
            padding: 15,
            backgroundColor: '#ffffff',
        },
        profileButtonContainer: {
            marginVertical: 10,
            borderBottomWidth: 0
        },
        profileHeader: {
            borderRadius: 15,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
        },
        profileHeaderText: {
            color: 'white'
        },
        profileCategories : {
            padding: 15,
            fontWeight: "bold"
        },
        profileBody: {
            borderRadius: 15,
            padding: 15,
            backgroundColor: '#ffffff',

        },
        profileBodyText: {
            justifyContent: 'center'
        }
    });

    return (
        <Container style={styles.container}>
            <Content padder showsVerticalScrollIndicator={false}>
                <Item style={styles.pickerContainer}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Team Name"
                            selectedValue={teamSelected}
                            onValueChange={setTeamSelected}>
                                {teamData.length ? 
                                    teamData.map((team, index) => {
                                        if(!team.is_solo) {
                                            return(
                                                <Picker.Item label={team.team_name} value={team} key={uuid()} />
                                            );
                                        }})
                                : null}
                        </Picker>
                    </Item>
                    {teamSelected ? isCaptain[teamSelected.team_id] ?
                    <Item style={styles.profileButtonContainer}>
                        <Left>
                            <Button rounded>
                                <Text>Update Team</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button danger rounded>
                                <Text>Delete Team</Text>
                            </Button>
                        </Right>
                    </Item>
                    : null : null}
                {teamSelected ? <Card style={styles.profileHeaderContainer}>
                    <CardItem style={styles.profileHeader}>
                        {teamSelected.team_photo ? <Left><Thumbnail large source={{uri: teamSelected.team_photo}} /></Left> : null}
                        <Body>
                            <Text style={{fontWeight: 'bold', marginBottom:2}}>{teamSelected.team_name}</Text>
                            {teamSelected.sport_id ? <Text note>Sport: {sportData[teamSelected.sport_id - 1].name}</Text> : null }
                            <Text note>Members: {teamSelected.team_members.length}</Text>
                            <Text note>Team Score: {teamSelected.score}</Text>
                        </Body>
                    </CardItem>
                </Card> : null}

                {teamSelected ? <Card style={styles.profileBody}>
                    <H3 style={styles.profileCategories}>Captain</H3>
                    <CardItem bordered>
                        <Left>
                            {teamSelected.captain.photo ? 
                            <Thumbnail large source={{uri: teamSelected.captain.photo}} />
                            : null}
                        </Left>
                        <Body style={styles.profileBodyText}>
                            <Text>{teamSelected.captain.username}</Text>
                            <Text note>{teamSelected.captain.nickname}</Text>
                        </Body>
                    </CardItem>
                    <Grid>
                        <Col>
                            <H3 style={styles.profileCategories}>Roster</H3>
                        </Col>
                    </Grid>
                    {teamSelected.team_members ? teamSelected.team_members.map((member, i) => (
                        <CardItem key={uuid()}>
                            <Left>
                                {member.photo ? 
                                <Thumbnail large source={{uri: member.photo}} />
                                : null}  
                            </Left>
                            <Body style={styles.profileBodyText}>
                                <Text>{member.username}</Text>
                                <Text note>{member.nickname}</Text>
                            </Body>
                        </CardItem>
                    )) : null}
                </Card> : null}
            </Content>
        </Container>
    );
}