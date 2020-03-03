import React, {useState, useEffect} from 'react';
import { Image } from 'react-native';
import { Container, List, ListItem, Left, Body, Text, Button } from 'native-base';
import axios from 'axios';

export default function SignupPageFour({onNextClick, username, password, email, sports, image, locationId}) {
    const [userObject, setUserObject] = useState({});
    const [sportsArray, setSportsArray] = useState([]);
    const postUser = () => {
        setUserObject({
            username,
            email,
            password,
            photo: image,
            city_id: locationId,
            player_rating: 5,
            nickname
        });
    };
    const postSports = () => {};
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
            <Button rounded onPress={onNextClick}>
                <Text>
                    Submit
                </Text>
            </Button>
        </Container>
    );

}
