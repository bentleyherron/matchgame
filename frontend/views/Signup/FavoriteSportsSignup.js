import React, { useState, useEffect } from 'react';
import { Container, Content, ListItem, Text, Radio, Button, Right, Left, H1, Footer, FooterTab } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';

export default function SignupPageThree({ route, navigation }) {
    const { onSportSelect, topSports } = route.params;

    const [sportsList, setSportsList] = useState(null);

    useEffect(() => {
        async function fetchSportsData() {
            const url = `${URL}/sports`;
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
            <Footer>
                <FooterTab>
                    <Button
                    onPress={() => {navigation.goBack()}}
                    >
                    <Text>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={() => {navigation.navigate('Review')}}
                    >
                    <Text>NEXT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>

    );
}