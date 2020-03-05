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
    const { userData, favoriteSports } = useContext(UserContext).state;
    const [userTeamIds, setUserTeamIds] = useState([]);
    const [userTeamData, setUserTeamData] = useState([]);

    useEffect(() => {
        axios.get(`${URL}/team-members/player/${userData.id}`)
            .then(r => {
                const uniques = r.data.filter((obj, i) => r.data.findIndex(el => el.team_id === obj.team_id) === i);
                setUserTeamIds(uniques);
            })
            .then(async () => {
                const newTeamData = await Promise.all(userTeamIds.map(async item => {
                    const response = await axios.get(`${URL}/teams/${item.team_id}`);
                    const team = await response.data;
                    return team;
                }));
                setUserTeamData(newTeamData);
            });
    },[])

    console.log(userTeamData);

    return (
        <Container>
            <Content padder>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail large source={{uri: userData.photo}} />
                            <Body>
                                <Text>{userData.username}</Text>
                                <Text note>{userData.nickname}</Text>
                                <Text note>Point Total: 250</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>

                
                <Card>
                    <H1 style={{padding: 20}}>Sports</H1>
                    <CardItem bordered>
                        <Grid>
                            <Row>
                                {favoriteSports.length ? favoriteSports.map((obj, i) => <Text key={i + "favSport"}>{obj.name}</Text>) : null}
                            </Row>
                        </Grid>
                    </CardItem>
                    <H1 style={{padding: 20}}>Teams</H1>
                    {userTeamData.length ? userTeamData.map((obj, i) => (
                        <CardItem key={i + 'teamcard'}>
                            <Left>
                            <Thumbnail large source={{uri: obj.photo}} />
                                <Body>
                                    <Text>{obj.name}</Text>
                                    <Text>Sport: {obj.sport_id}</Text>
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