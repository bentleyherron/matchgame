import React from 'react';
import { View, Image } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Button, Right, Left, H1 } from 'native-base';

export default function SignupPageThree({ onSportSelect, topSports, onNextClick }) {

    const sportsList = ['Football', 'Flag Football', 'Soccer', 'Volleyball', 'Kuub', 'Darts', 'Ultimate Frisbee', 'Wiffle Ball', 'Softball', 'Baseball', 'Bowling', 'Kickball', 'Bowling', 'Ping Pong', 'Beer Pong', 'Cornhole', 'Bocci', 'Shooting', 'Shuffleboard', 'Tennis', 'Quidditch' ]

    function sportElement(sportName, index) {
        return(
            <ListItem onPress={() => onSportSelect(sportName)} key={index + 'r'}>
                <Left>
                    <Text>{sportName}</Text>
                </Left>
                <Right>
                    <Radio selected={topSports.includes(sportName)} />
                </Right>
          </ListItem>
        );
    }

    return(
        <Container>
            <H1>Select Favorite Sports</H1>
            <Content>
            {
                sportsList.map((sport, i) => {
                    return(
                        sportElement(sport, i)
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