import React from 'react';
import { View, Image } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Button, Right, Left, H1 } from 'native-base';

export default function SignupPageThree({ onSportSelect, topSports, onNextClick }) {

    const sportsList = ['Football', 'Flag Football', 'Soccer', 'Volleyball', 'Kuub', 'Darts', 'Ultimate Frisbee', 'Wiffle Ball', 'Softball', 'Baseball', 'Bowling', 'Kickball', 'Bowling', 'Ping Pong', 'Beer Pong', 'Cornhole', 'Bocci', 'Shooting', 'Shuffleboard', 'Tennis', 'Quidditch' ]

    function sportElement(sportName) {
        return(
            <ListItem>
                <Button 
                    onPress={() => {
                        onSportSelect(sportName);
                    }}>
                        
                        <Text>{sportName}</Text>
                </Button>
          </ListItem>
        );
    }

    function handleSportClick() {

    }

    return(
        <Container>
            <H1>Select Favorite Sports</H1>
            <H1>{topSports}</H1>
            <Content>
            {
                sportsList.map(sport => {
                    return(
                        sportElement(sport)
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