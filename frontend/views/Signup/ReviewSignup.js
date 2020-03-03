import React, { useState } from 'react';
import { Image } from 'react-native';
import { Container, List, ListItem, Left, Body, Text, Button } from 'native-base';
import axios from 'axios';

export default function SignupPageFour({
    onNextClick,
    username,
    nickname,
    password,
    email,
    sports,
    image,
    locationId,
    setUserData,
    setFavoriteSports
}) {
    const [userObject, setUserObject] = useState({
        user: {
            username,
            email,
            password,
            // photo: image,
            city_id: locationId.id,
            player_rating: 5,
            nickname}
        });
    const [sportsArray, setSportsArray] = useState(sports.map(sport => {return {sport_id: sport.id}}));
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const postUser = async () => {
        const url = `https://8ab0e3a4.ngrok.io/users`
        const response = await axios.post(url, userObject);
        setUserData(response.data);
        return response.data.id;
    };
    const postSports = async (id) => {
        const url = `https://8ab0e3a4.ngrok.io/favorite-sports/`;
        const sportsArrayObject = {favoriteSports:sportsArray.map(sport => {return {...sport, user_id: id}})};
        console.log(sportsArrayObject);
        const response = await axios.post(url, sportsArrayObject);
        setFavoriteSports(response.data);
    };

    const postSignupData = async () => {
        const id = await postUser();
        postSports(id);
        return false; // change this for error handling
    }

    return(
        <Container>
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
                        <Image style={{width: 100, height: 100}} source={{uri: image}} />
                    </Body>
                </ListItem>
            </List>
            <Button rounded onPress={async () => {
                setIsSubmitting(true);
                const wasSubmitted = await postSignupData();
                setIsSubmitting(wasSubmitted);
                !wasSubmitted ? onNextClick() : console.log('error posting data');
                }}>
                <Text>
                    Submit
                </Text>
            </Button>
        </Container>
    );

}
