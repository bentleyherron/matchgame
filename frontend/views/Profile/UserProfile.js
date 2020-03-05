import React, {useState, useEffect, useContext} from 'react';
import {FlatList}  from 'react-native';
import { Container, Content, Card, CardItem, Left, Grid, Row, Thumbnail, Body, Text, H1, Accordion} from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

const dataArray = [
    { title: "Individual", content: "Games" },
    { title: "Weekend Warriors", content: "Games" },
    { title: "Mighty Ducks", content: "Games" }
  ];

export default function ProfilePage(){
    const { userData } = useContext(UserContext).state;
    const {totalScore, teamScores, teams, userInfo, favoriteSports} = userData;
    const {id, nickname, username, city_id, photo } = userInfo;
    const [uniqueTeams, setUniqueTeams] = useState([]);
    const [userTeamData, setUserTeamData] = useState([]);
    const [sportsList, setSportsList] = useState([]);
    const [uniqueFavSports, setUniqueFavSports] = useState([]);

    const getUniques = (arr, keyToCheck) => {
        return arr.filter((obj, i) => arr.findIndex(el => el[keyToCheck] === obj[keyToCheck]) === i) 
    }
    useEffect(() => {
        setUniqueTeams(getUniques(teams, "team_id"));

        const fetchSportsList = async () => {
            const response = await axios.get(`${URL}/sports`);
            const newSportsList = await response.data;
            setSportsList(newSportsList);
        }

        const fetchTeamData = async () => {
            const newTeamData = await Promise.all(uniqueTeams.map(async item => {
                const response = await axios.get(`${URL}/teams/${item.team_id}`);
                const team = await response.data;
                return team;
                }));
            setUserTeamData(newTeamData);
        }
        fetchSportsList().then(
            () => {
                setUniqueFavSports(getUniques(favoriteSports, "sport_id").map(item => {return {name: sportsList[item.sport_id - 1].name}}));
                fetchTeamData();
            }
        );

    },[])

    console.log(sportsList.length ? sportsList[1].name : null);
    
    return (
        <Container>
            <Content padder>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail large source={{uri: photo}} />
                            <Body>
                                <Text>{username}</Text>
                                <Text note>{nickname}</Text>
                                <Text note>Point Total: {totalScore}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>

                
                <Card>
                    <H1 style={{padding: 20}}>Sports</H1>
                    <CardItem bordered>
                        <Grid>
                            <Row>
                                {uniqueFavSports.length ? uniqueFavSports.map((obj, i) => <Text key={i + "favSport"}>{obj.name}</Text>) : null}
                            </Row>
                        </Grid>
                    </CardItem>
                    <H1 style={{padding: 20}}>Teams</H1>
                    {userTeamData.length && sportsList.length ? userTeamData.map((obj, i) => (
                        <CardItem key={i + 'teamcard'}>
                            <Left>
                            <Thumbnail large source={{uri: obj.photo}} />
                                <Body>
                                    <Text>{obj.name}</Text>
                                    {obj.sport_id ? <Text>Sport: {sportsList[obj.sport_id - 1].name}</Text> : null}
                                    <Text note>Team Point Total: 800</Text>
                                    <Text note>Region: {obj.city_id}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    )):
                    null}
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