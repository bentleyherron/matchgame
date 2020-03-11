import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, FlatList }  from 'react-native';
import { Container, Content, Card, CardItem, Left, Grid, Row, Thumbnail, Body, Text, H1, Accordion, Spinner, Right, Button, Icon, StyleProvider} from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

const dataArray = [
    { title: "Individual", content: "Games" },
    { title: "Weekend Warriors", content: "Games" },
    { title: "Mighty Ducks", content: "Games" }
  ];

export default function ProfilePage({ navigation }){
    const { userData, sportData } = useContext(UserContext).state;
    const {totalScore, teams, userInfo, favoriteSports, teamScores} = userData;
    const {id, nickname, username, city_id, photo } = userInfo;
    const sportsList = sportData;
    const [uniqueFavSports, setUniqueFavSports] = useState([]);
    const [reducedTeamScores, setReducedTeamScores] = useState(null);

    const getUniques = (arr, keyToCheck) => {
        return arr.filter((obj, i) => arr.findIndex(el => el[keyToCheck] === obj[keyToCheck]) === i) 
    }

    const getTeamScores = (arr) => {
        const teamObj = {};
        arr.forEach((obj, i) => {
            if (teamObj[obj.team_id] !== undefined) {
                teamObj[obj.team_id] += obj.score;
            } else {
                teamObj[obj.team_id] = obj.score;
            }
        })
        return teamObj;
    };

    useEffect(() => {
        setReducedTeamScores(getTeamScores(teamScores));
        setUniqueFavSports(getUniques(favoriteSports, "sport_id").map(item => {return {name: sportsList[item.sport_id - 1].name}}));
    }, []);

    if (!userData) {
        return (
            <Container>
                <Content>
                    <Spinner />
                </Content>
            </Container>
        )
    }

    const styles = StyleSheet.create({
        container: {
            padding: 15,
            backgroundColor: '#fafafa'
        },
        profileHeader: {
            marginBottom: 5,
            borderRadius: 15,
            backgroundColor: '#fafafa'
        },
        profileCategories : {
            padding: 15
        },
        profileBody: {
            borderRadius: 15,
            padding: 15
        }
    });

    return (
            <Container style={styles.container}>
            <Content padder>
                <Card transparent style={styles.profileHeader}>
                    <CardItem style={styles.profileHeader}>
                        <Left>
                            {photo ? <Thumbnail large source={{uri: photo}} /> : null}
                        </Left>
                        <Body>
                            <Text>{username}</Text>
                            <Text note>{nickname}</Text>
                            <Text note>Point Total: {totalScore}</Text>
                        </Body>
                        <Right style={styles.editIconContainer}>
                            <Icon type="AntDesign" name="edit" onPress={() => navigation.navigate('User Update')} />
                        </Right>
                    </CardItem>
                </Card>

                
                <Card style={styles.profileBody}>
                    <H1 style={styles.profileCategories}>Sports</H1>
                    <CardItem bordered style={styles.profileBody}>
                        {uniqueFavSports.length ? uniqueFavSports.map((obj, i) => <Text key={i + "favSport"}>{obj.name}</Text>) : null}
                    </CardItem>
                    <H1 style={{padding: 20}}>Teams</H1>
                    {teams ? teams.map((obj, i) => (
                        <CardItem key={i + 'teamcard'} style={styles.profileBody}>
                            <Left>
                            <Thumbnail large source={{uri: obj.photo}} />
                                <Body>
                                    <Text>{obj.name}</Text>
                                    {obj.sport_id ? <Text>Sport: {sportsList[obj.sport_id - 1].name}</Text> : null}
                                    {reducedTeamScores ? <Text note>Team Point Total: {reducedTeamScores[obj.id]}</Text> : null}
                                    <Text note>Region: {obj.city_id}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    )):
                    null}
                </Card>
            </Content>
            </Container>
       
    );

}