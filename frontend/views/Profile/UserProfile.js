import React, {useState, useEffect, useContext} from 'react';
import {FlatList}  from 'react-native';
import { Container, Content, Card, CardItem, Left, Grid, Row, Thumbnail, Body, Text, H1, Accordion, Spinner, Right, Button, Icon} from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

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
    return (
        <Container>
            <Content padder>
                <Card>
                    <CardItem>
                        <Left>
                            {photo ? <Thumbnail large source={{uri: photo}} /> : null}
                            <Body>
                                <Text>{username}</Text>
                                <Text note>{nickname}</Text>
                                <Text note>Point Total: {totalScore}</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Button onPress={() => navigation.navigate('User Update')}>
                                <Icon type="AntDesign" name="edit" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

                
                <Card>
                    <H1 style={{padding: 20}}>Sports</H1>
                    <CardItem bordered style={{flexDirection: 'column', justifyContent:"flex-start", alignItems:"flex-start"}}>
                        {uniqueFavSports.length ? uniqueFavSports.map((obj, i) => <Text key={i + "favSport"}>{obj.name}</Text>) : null}
                    </CardItem>
                    <H1 style={{padding: 20}}>Teams</H1>
                    {teams.map((obj, i) => 
                    {
                        if(!obj.is_solo) {
                            return (
                            <CardItem key={i + 'teamcard'}>
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
                            );
                        }
                    }

                    )}
                {/* 
                <H1 style={{padding: 20}}>Record</H1>
                <CardItem>
                    <Accordion dataArray={dataArray} expanded={0}/>
                </CardItem> */}
                </Card>
            </Content>
        </Container>
    );
}