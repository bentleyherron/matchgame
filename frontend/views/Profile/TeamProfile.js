import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Grid, Row, Col, Thumbnail, Body, Text, Button, H1, Accordion, Spinner, Item, Picker, Icon, Toast } from 'native-base';

import { YellowBox } from 'react-native';
import axios from 'axios';
import { URL } from 'react-native-dotenv';
import UserContext from '../../UserContext';

const dataArray = [
    { title: "All Sports", content: "Games" },
    { title: "Ice Hockey", content: "Games" },
    { title: "Ultimate Frisbee", content: "Games" }
  ];

export default function TeamProfile({navigation}){
    const { userData, sportData, userToken } = useContext(UserContext).state;
    const [isCaptain, setIsCaptain] = useState(false);
    const [teamData, setTeamData] = useState(null);
    const [teamSelected, setTeamSelected] = useState(null);

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
            } else {
                const dataResults = await Promise.all(teamArr.map(async teamObj => {
                    const teamProfile = await axios.get(`${URL}/profile/team/${teamObj.id}/`, {
                        headers: {
                          "x-access-token": userToken
                        }});
                    return teamProfile.data;
                }));
                setTeamData(dataResults);
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

    const captainAdd = 
        <Col>
            <Button rounded>
                <Text>Add Team Member</Text>
            </Button>
        </Col>;

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
            paddingRight: 10
        },
        profileHeaderContainer : {
            marginBottom: 15,
            borderRadius: 15,
        },
        profileHeader: {
            marginBottom: 5,
            borderRadius: 15,
            backgroundColor: '#fafafa',
        },
        profileCategories : {
            padding: 15,
            fontWeight: "bold"
        },
        profileBody: {
            borderRadius: 15,
            padding: 15
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
                                                <Picker.Item label={team.team_name} value={team} key={index + 'team'} />
                                            );
                                        }})
                                : null}
                        </Picker>
                    </Item>

                {teamSelected ? <Card style={styles.profileHeaderContainer}>
                    <CardItem style={styles.profileHeader}>
                        {teamSelected.photo ? <Left><Thumbnail large source={{uri: teamSelected.photo}} /></Left> : null}
                        <Body>
                            <Text>{teamSelected.team_name}</Text>
                            <Text note>Members: {teamSelected.team_members.length}</Text>
                            <Text note>Score: {teamSelected.score}</Text>
                            </Body>
                    </CardItem>
                </Card> : null}

                {teamSelected ? <Card style={styles.profileBody}>
                    <H1 style={styles.profileCategories}>Captain</H1>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail large source={{uri: teamSelected.captain.photo}} />
                        </Left>
                        <Body style={styles.profileBodyText}>
                            <Text>{teamSelected.captain.username}</Text>
                            <Text note>{teamSelected.captain.nickname}</Text>
                        </Body>
                    </CardItem>
                    {/* <CardItem>
                        <Left>
                            Sport:
                        </Left>
                        <Body>
                            {sportData ? sportData[sport_id - 1].name : null}
                        </Body>
                    </CardItem> */}
                    {/* <H1 style={{padding: 20}}>Record</H1>
                    <CardItem>
                        <Accordion dataArray={dataArray} expanded={0}/>
                    </CardItem> */}
                    <Grid>
                        <Col>
                            <H1 style={styles.profileCategories}>Roster</H1>
                        </Col>
                        {isCaptain ? captainAdd : null}
                    </Grid>
                    {teamSelected.team_members ? teamSelected.team_members.map((member, i) => (
                        <CardItem key={i + "team_members"}>
                            <Left>
                                <Thumbnail large source={{uri: member.photo}} />
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