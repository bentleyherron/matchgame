import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, FlatList }  from 'react-native';
import { Container, Content, Card, CardItem, ListItem, Left, Grid, Row, Col, Thumbnail, Body, Text, H1, Accordion, Spinner, Right, Button, Icon, StyleProvider} from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

export default function ProfilePage({ navigation }){
    const {actions, state} = useContext(UserContext);
    const {setUserData, setUserToken, setHasSignedUp, setShouldRefresh} = actions;
    const { userData, sportData } = state;
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

    const logout = () => {
        navigation.navigate('Signup');
        setShouldRefresh(currentState => !currentState);
    }

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
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: '#fafafa'
        },
        profileButtons: {
            padding: 15,
            marginTop: 5,
            borderRadius: 15,
            backgroundColor: '#fafafa',
            justifyContent: "flex-end"
        },
        profileHeader: {
            marginBottom: 5,
            borderRadius: 15,
            backgroundColor: '#fafafa',
            borderBottomWidth: 0
        },
        profileCategories : {
            padding: 15,
            fontWeight: "bold"
        },
        profileBody: {
            borderRadius: 15,
            padding: 15
        }
    });

    return (
        <Container style={styles.container}>
            <Content padder>
                <Grid>
                    <Row style={styles.profileButtons}> 
                        <Button light rounded small><Text onPress={() => logout()}>Logout</Text></Button>
                        <Button light rounded small>
                                <Icon type="AntDesign" name="edit" onPress={() => navigation.navigate('User Update')} />
                            </Button>

                    </Row>
                </Grid>
                <Card transparent>
                    <ListItem avatar noBorder style={styles.profileHeader}>
                        <Left>
                            {photo ? <Thumbnail large source={{uri: photo}} /> : null}
                        </Left>
                        <Body>
                            <Text>{username}</Text>
                            <Text note>{nickname}</Text>
                            <Text note>Point Total: {totalScore}</Text>
                        </Body>
                        <Right>
                            
                        </Right>
                    </ListItem>
                </Card>

                
                <Card style={styles.profileBody}>
                    <H1 style={styles.profileCategories}>Sports</H1>
                    <CardItem bordered style={styles.profileBody}>
                        <Body>
                        {uniqueFavSports.length ? uniqueFavSports.map((obj, i) => <Text key={i + "favSport"} style={{padding: 5}}>{obj.name}</Text>) : null}
                        </Body>
                    </CardItem>
                    <H1 style={styles.profileCategories}>Teams</H1>
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
                                        <Text note>Region: {obj.city_state}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            );
                        }
                    }

                    )}
                </Card>
            </Content>
            </Container>
       
    );

}