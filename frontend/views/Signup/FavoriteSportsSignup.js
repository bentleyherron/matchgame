import React, { useState, useEffect } from 'react';
import { Container, Content, ListItem, Text, Radio, Button, Right, Left, H1 } from 'native-base';
import axios from 'axios'

export default function SignupPageThree({ onSportSelect, topSports, onNextClick }) {

    const sportsList = ['Football', 'Flag Football', 'Soccer', 'Volleyball', 'Kuub', 'Darts', 'Ultimate Frisbee', 'Wiffle Ball', 'Softball', 'Baseball', 'Bowling', 'Kickball', 'Bowling', 'Ping Pong', 'Beer Pong', 'Cornhole', 'Bocci', 'Shooting', 'Shuffleboard', 'Tennis', 'Quidditch' ]
    const [sportsList, setSportsList] = useState(null);


    return(
        <Container>
            <H1>Select Favorite Sports</H1>
            <Content>
            {
                sportsList.map((sport, i) => {
                    return (
                        <ListItem onPress={() => onSportSelect(sport)} key={i + 'r'}>
                            <Left>
                                <Text>{sport}</Text>
                            </Left>
                            <Right>
                                <Radio selected={topSports.includes(sport)} />
                            </Right>
                        </ListItem>
                    )
                })
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