import React, { useState, useContext } from 'react';
import { Image } from 'react-native';
import { Container, List, ListItem, Left, Body, Text, Button, Footer, FooterTab, Content, Spinner, Thumbnail } from 'native-base';
import axios from 'axios';
import { URL } from 'react-native-dotenv';
import uuid from 'react-uuid';
import SignupContext from './SignupContext';
import UserContext from '../../UserContext';

export default function SignupPageFour({ navigation }) {
    const { username, nickname, password, email, sports, selectedImage, locationId } = useContext(SignupContext).state;
    const { setUserData, setHasSignedUp, setUserToken } = useContext(UserContext).actions;
    const [userObject, setUserObject] = useState({
        user: {
            username,
            email,
            password,
            photo: selectedImage,
            city_id: locationId.id,
            player_rating: 5,
            nickname}
        });

    const [sportsArray, setSportsArray] = useState(sports.map(sport => {return {sport_id: sport.id}}));
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const postUser = async () => {
        try{
            setIsSubmitting(true);
            const url = `${URL}/signup/`
            const response = await axios.post(url, userObject);
            return response.data;
        } catch(err) {
            Toast.show({
                text: "Something went wrong, redirecting to login",
                buttonText: "Okay"
            })
            navigation.navigate('User Login')
        }
    };
    const postSports = async () => {
        axios.post(`${URL}/login/`, {user: {
            email,
            password
            }}).then(
                r => {
                    setUserToken(r.data.token);
                    const url = `${URL}/favorite-sports/`;
                    const sportsArrayObject = {favoriteSports:sportsArray.map(sport => {return {...sport, user_id: null}})};
                    axios.post(url, sportsArrayObject, {
                        headers: {
                            "x-access-token": r.data.token
                        }
                    }).then(
                        r => {
                            setIsSubmitting(false);
                            setHasSignedUp(true);
                            navigation.navigate('User Login');
                        }
                    )
                }
            ).catch(() => {
                Toast.show({
                    text: "Something went wrong, redirecting to login",
                    buttonText: "Okay"
                });
                navigation.navigate('User Login')
            })

    };

    const postSignupData = async () => {
        try{
            const data = await postUser();
            postSports(data);
            return false; // change this for error handling
        } catch(err) {
            Toast.show({
                text: "Something went wrong, redirecting to login",
                buttonText: "Okay"
            })
            setTimeout(() => {
                navigation.navigate('User Login')
            }, 5000)
        }
    }

    return(
        <Container>
            <Content>
                <List>
                    <ListItem>
                        <Left>
                            <Text>
                                Username:
                            </Text>
                        </Left>
                        <Body>
                            <Text>
                                {username}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                Nickname:
                            </Text>
                        </Left>
                        <Body>
                            <Text>
                                {nickname}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                Email:
                            </Text>
                        </Left>
                        <Body>
                            <Text>
                                {email}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                City:
                            </Text>
                        </Left>
                        <Body>
                            <Text>
                                {locationId.city}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                Favorite Sports:
                            </Text>
                        </Left>
                        <Body>
                            <List>
                                {sports.map((sport) => (
                                        <Text key={uuid()}>{sport.name}</Text>
                                ))}
                            </List>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Picture:</Text>
                        </Left>
                        <Body>
                            {selectedImage ? 
                            <Thumbnail large source={{uri: selectedImage}} />
                            : null}
                        </Body>
                    </ListItem>
                </List>
                {isSubmitting ? <Spinner /> : null}
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                    onPress={() => {navigation.goBack()}}
                    >
                        <Text style={{fontSize: 15}}>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={async () => {
                        postSignupData();
                    }}
                    >
                        <Text style={{fontSize: 15}}>SUBMIT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );

}
