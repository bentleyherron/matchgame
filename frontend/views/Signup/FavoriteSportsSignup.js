import React, { useState, useEffect, useContext } from 'react';
import { Container, Content, ListItem, Text, Radio, Button, Right, Left, Footer, FooterTab, Toast } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import SignupContext from './SignupContext';

export default function SignupPageThree({ navigation }) {

    const context = useContext(SignupContext);
    const {sports} = context.state;
    const {onSportSelect} = context.actions;
    const [sportsList, setSportsList] = useState(null);

    useEffect(() => {
        axios.get(`${URL}/sports`)
            .then( r => {
                setSportsList(r.data)
            })
            .catch(() => {
                Toast.show({
                    text: "Could not get sports list. Try again later",
                    buttonText: "Okay"
                })
                setTimeout(() => {
                    navigation.navigate('User Login');
                })
            })
    }, [])
    
    return(
        <Container>
            <Content>
            {
                sportsList ? sportsList.map((sport) => {
                    return (
                        <ListItem onPress={() => onSportSelect(sport)} key={sport.id + 'r'}>
                            <Left>
                                <Text>{sport.name}</Text>
                            </Left>
                            <Right>
                                <Radio selected={sports.filter(item => item.name === sport.name).length > 0} />
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
                    onPress={() => {
                        if(sports.length) {
                            navigation.navigate('Review');
                        } else {
                            Toast.show({
                                text:"Select at least one sport to continue",
                                buttonText:"Okay",
                                position:"top"
                            });
                        }
                        
                    }}
                    >
                    <Text>NEXT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>

    );
}