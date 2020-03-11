import React, { useState, useContext } from 'react';
import { Image } from 'react-native';
import { Container, List, ListItem, Left, Body, Text, Button, Footer, FooterTab, Content, Spinner } from 'native-base';
import axios from 'axios';
import { URL } from 'react-native-dotenv';
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
            console.log(err);
        }
    };
    const postSports = async () => {
        try{
            axios.post(`${URL}/login/`, {user: {
                email,
                password
              }}).then(
                  r => {
                      console.log(r.data.token);
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
              )
        } catch(err) {
            console.log(err);
        }
    };

    const postSignupData = async () => {
        try{
            const data = await postUser();
            postSports(data);
            return false; // change this for error handling
        } catch(err) {
            console.log(err);
            return true;
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
                                        <Text key={sport.id+"sport"}>{sport.name}</Text>
                                ))}
                            </List>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Picture:</Text>
                        </Left>
                        <Body>
                            <Image style={{width: 100, height: 100}} source={{uri: selectedImage}} />
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
                        <Text>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={async () => {
                        postSignupData();
                    }}
                    >
                        <Text>Submit</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );

}
