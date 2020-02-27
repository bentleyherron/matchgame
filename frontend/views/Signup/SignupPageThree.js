import React from 'react';
import { View, Image } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, H1 } from 'native-base';

export default function SignupPageThree() {

    const sportsList = ['Flag Football', 'Soccer', 'Volleyball', 'Kuub']

    function sportElement(sportName) {
        return(
            <ListItem>
                <Left>
                    <Text>{sportName}</Text>
                </Left>
                <Right>
                    <Radio selected={false} />
                </Right>
          </ListItem>
        );
    }
    return(
        <Container>
            <H1>Select Favorite Sports</H1>
            <Content>
            {
                sportsList.map(sport => {
                    return(
                        sportElement(sport)
                    )
                })
            }
            </Content>
        </Container>

    );
}