import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Card, CardItem, Text, Content, Picker, Container, Spinner, Left, Body, Toast } from 'native-base';
import UserContext from '../../UserContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';


// get all teams in a region and sort by sport


export default function Leaderboard() {
    const [teamData, setTeamData] = useState(null);
    const[regionSportList, setRegionSportList] = useState(null);
    const [currentSport, setCurrentSport] = useState(null);
    const [teamsFilteredBySport, setTeamsFilteredBySport] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const {sportData, userToken, userData} = useContext(UserContext).state;

    useEffect(() => {
        axios.get(`${URL}/leaderboard/${userData.userInfo.city_id}`, {
            headers: {
                "x-access-token": userToken
            }
            })
            .then(
                r => setTeamData(r.data)
            )
            .catch(() => {
                Toast.show({
                    text: "Unable to access the leaderboard",
                    buttonText: "Okay"
                })
                setTimeout(() => {
                    navigation.navigate('Feed')
                }, 5000)
            })
    }, [])


    // set sports list for region based upon sport_id of teams in region
    useEffect(() => {
        if(teamData && sportData){
            const teamsBySport = {};
            teamData.forEach((team) => {
                if(team.sport_id) {
                    if(teamsBySport[team.sport_id]) {
                        teamsBySport[team.sport_id].push(team);
                    } else {
                        teamsBySport[team.sport_id] = [team];
                    }
                }
            });
            setRegionSportList(Object.keys(teamsBySport).map((sport_id) => {
                return sportData[sport_id - 1]}));
        }
    }, [teamData]);

    const fetchFilteredTeams = async () => {
        const shownTeams = teamData.filter(teamObj => teamObj.sport_id === currentSport.id);
        setTeamsFilteredBySport(shownTeams);
    }

    // show top scoring teams for region
    useEffect(() => {
        if(teamData && currentSport) {
            fetchFilteredTeams();
        }
    }, [currentSport, teamData])

    if (!teamData || !sportData) {
        return (
        <Container>
            <Content>
                <Spinner />
            </Content>
        </Container>
        );
    }

    const styles = StyleSheet.create({
        leaderboardContainer: {
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: '#fafafa'
        },
        boardCard: {
            borderRadius: 15
        }
    });

    return (
        <Content style={styles.leaderboardContainer}>
                <Picker
                note
                mode="dropdown"
                selectedValue={currentSport}
                onValueChange={setCurrentSport}
                >
                    {regionSportList ? regionSportList.map(sportObj => (<Picker.Item key={sportObj.id + "sportId"} label={sportObj.name} value={sportObj} />)) : null}
                </Picker>

            {isLoading ? <Spinner /> : 
            teamsFilteredBySport && teamsFilteredBySport.length > 1 ?
            <Card style={styles.boardCard}>
                {teamsFilteredBySport.sort((a, b) => (a.score > b.score) ? -1 : 1)
                        .map((item, index) => (
                            <CardItem style={styles.boardCard} key={index + "teamSportScoreObjs"}>
                                <Left style={{flexDirection: 'column'}}>
                                    <Text>Name:</Text>
                                    <Text>Score:</Text>
                                </Left>
                                <Body style={{flexDirection: 'column'}}>
                                    <Text>{item.team_name}</Text>
                                    <Text>{item.score}</Text>
                                </Body>
                            </CardItem>
                                ))}
            </Card> : 
            teamsFilteredBySport ?
            <Card style={styles.boardCard}>
            {teamsFilteredBySport
                    .map((item, index) => (
                            <CardItem style={styles.boardCard} key={index + "teamSportScoreObjs"}>
                                <Left>
                                    <Body>
                                        <Text>Name:</Text>
                                        <Text>Score:</Text>
                                    </Body>
                                </Left>
                                <Body style={{flexDirection: 'column'}}>
                                    <Text>{item.team_name}</Text>
                                    <Text>{item.score}</Text>
                                </Body>
                            </CardItem>)
                            )}
            </Card> :
            null
            }
        </Content>
    );
}