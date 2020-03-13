import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, FlatList }  from 'react-native';
import { Container, Content, Card, CardItem, ListItem, Left, Grid, Row, Col, Thumbnail, Body, Text, H1, H2, H3, Accordion, Spinner, Right, Button, Icon, StyleProvider} from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import uuid from 'react-uuid';
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
        setUniqueFavSports(getUniques(favoriteSports, "sport_id").map(item => {return {name: sportsList[item.sport_id - 1].name, id: item.sport_id}}));
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
            justifyContent: "space-around"
        },
        profileHeader: {
            paddingLeft: 5,
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

    const sportIcons = [
        {id: 1, name: "Football", family: "FontAwesome5", icon:"football-ball"},
        {id: 2, name: "Basketball", family: "FontAwesome5", icon:"basketball-ball"},
        {id: 3, name: "Kubb", family: "FontAwesome5", icon:"crown"},
        {id: 4, name: "Darts", family: "FontAwesome5", icon:"bullseye"},
        {id: 5, name: "Ultimate Frisbee", family: "Feather", icon:"disc"},
        {id: 6, name: "Soccer", family: "MaterialCommunityIcons", icon:"soccer"},
        {id: 7, name: "Wiffle Ball", family: "MaterialCommunityIcons", icon:"baseball-ball"},
        {id: 8, name: "Softball", family: "FontAwesome5", icon:"baseball-ball"},
        {id: 9, name: "Baseball", family: "FontAwesome5", icon:"baseball-ball"},
        {id: 10, name: "Bowling", family: "FontAwesome5", icon:"bowling-ball"},
        {id: 11, name: "Kickball", family: "FontAwesome5", icon:"soccer-ball-o"},
        {id: 12, name: "Beer Pong", family: "MaterialCommunityIcons", icon:"beer"},
        {id: 13, name: "Cornhole", family: "MaterialCommunityIcons", icon:"corn"},
        {id: 14, name: "Volleyball", family: "FontAwesome5", icon:"volleyball-ball"},
        {id: 15, name: "Bocce Ball", family: "MaterialCommunityIcons", icon:"tennis-ball"},
        {id: 16, name: "Ping Pong", family: "FontAwesome5", icon:"table-tennis"},
        {id: 17, name: "Golf", family: "MaterialCommunityIcons", icon:"golf"},
        {id: 18, name: "Tennis", family: "MaterialCommunityIcons", icon:"tennis"},
        {id: 19, name: "Lacrosse", family: "MaterialCommunityIcons", icon:"hockey-sticks"}
      ]

    return (
        <Container style={styles.container}>
            <Content padder showsVerticalScrollIndicator={false}>
                <Grid>
                    <Row style={styles.profileButtons}> 
                        <Button light rounded small>
                                <Text onPress={() => navigation.navigate('User Update')}>Edit Profile</Text>
                        </Button>
                        <Button light rounded small><Text onPress={() => logout()}>Logout</Text></Button>
                    </Row>
                </Grid>
                <Card  style={styles.profileHeader}>
                    <ListItem avatar noBorder style={styles.profileHeader}>
                        <Left>
                            {photo ? <Thumbnail large source={{uri: photo}} /> : null}
                        </Left>
                        <Body>
                            <Text style={{fontWeight: 'bold'}}>{username}</Text>
                            <Text note>{nickname}</Text>
                            <Text note>Point Total: {totalScore}</Text>
                        </Body>
                        <Right>
                            
                        </Right>
                    </ListItem>
                </Card>

                
                <Card style={styles.profileBody}>
                    <H3 style={styles.profileCategories}>Sports</H3>
                    <CardItem bordered style={styles.profileBody}>
                        <Body>
    {uniqueFavSports.length ? uniqueFavSports.map((obj, i) => <Text><Icon style={{fontSize:18}} type={sportIcons[obj.id -1].family} name={sportIcons[obj.id-1].icon} /> {obj.name}</Text>) : null}
                        </Body>
                    </CardItem>
                    <H3 style={styles.profileCategories}>Teams</H3>
                    {teams.map((obj, i) => 
                    {
                        if(!obj.is_solo) {
                            return (
                            <CardItem key={uuid()}>
                                <Left>
                                 <Thumbnail large source={{uri: obj.photo}} />
                                </Left>
                                <Body>
                                    <Text>{obj.name}</Text>
                                    {obj.sport_id ? <Text note>{sportsList[obj.sport_id - 1].name}</Text> : null}
                                    {reducedTeamScores ? <Text note>Point Total: {reducedTeamScores[obj.id]}</Text> : null}
                                    <Text note>{obj.city_state}</Text>
                                </Body>
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