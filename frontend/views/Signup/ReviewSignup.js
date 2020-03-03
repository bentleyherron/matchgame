import React, {useState, useEffect} from 'react';
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
    userData,
    setFavoriteSports
}) {
    const [userObject, setUserObject] = useState({
        user: {
            username,
            email,
            password,
            city_id: locationId.id,
            player_rating: 5,
            nickname}
        });
    const [sportsArray, setSportsArray] = useState(sports);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const postUser = async () => {
        const url = `https://8ab0e3a4.ngrok.io/users`
        const response = await axios.post(url, userObject);
        setUserData(response.data);
    };
    const postSports = async (id) => {
        const url = `https://8ab0e3a4.ngrok.io/favorite-sports/player/${id}`;
        const response = await axios.post(url, sports);
        setFavoriteSports(response.data);
    };
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
                            {sports.map((name, i) => (
                                    <Text key={i+"sport"}>{name}</Text>
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
            <Button rounded onPress={() => {
                onNextClick();
                postUser();
                }}>
                <Text>
                    Submit
                </Text>
            </Button>
        </Container>
    );

}
