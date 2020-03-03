import React, { useState, useEffect } from 'react';
import { Container, Content, ListItem, Text, Radio, Button, Right, Left, H1 } from 'native-base';
import axios from 'axios'

export default function SignupPageThree({ onSportSelect, topSports, onNextClick }) {

    // const sportsList = ['Football', 'Flag Football', 'Soccer', 'Volleyball', 'Kuub', 'Darts', 'Ultimate Frisbee', 'Wiffle Ball', 'Softball', 'Baseball', 'Bowling', 'Kickball', 'Bowling', 'Ping Pong', 'Beer Pong', 'Cornhole', 'Bocci', 'Shooting', 'Shuffleboard', 'Tennis', 'Quidditch' ]
    const [sportsList, setSportsList] = useState(null);
    useEffect(() => {
        async function fetchSportsData() {
            const url = `https://8ab0e3a4.ngrok.io/sports`;
            const response = await axios.get(url);
            setSportsList(response.data);
        }
        fetchSportsData();
    }, [])
    return(
        <Container>
            <H1>Select Favorite Sports</H1>
            <Content>
            {
                sportsList ? sportsList.map((sport) => {
                    return (
                        <ListItem onPress={() => onSportSelect(sport)} key={sport.id + 'r'}>
                            <Left>
                                <Text>{sport.name}</Text>
                            </Left>
                            <Right>
                                <Radio selected={topSports.filter(item => item.name === sport.name).length > 0} />
                            </Right>
                        </ListItem>
                    )
                }) :
                null
            }
            </Content>
            <Button
                rounded
                onPress={onNextClick}>
                <Text>
                    NEXT
                </Text>
            </Button>
        </Container>

    );
}