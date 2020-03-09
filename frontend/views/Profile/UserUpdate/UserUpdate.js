import React, { useState, useContext } from 'react';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Container, List, ListItem, Left, Body, Text, Button, Footer, FooterTab, Content, Spinner, Input, Thumbnail } from 'native-base';
import axios from 'axios';
import { URL } from 'react-native-dotenv';
import UserContext from '../../../UserContext';

// David needs to be able to correctly redirect to the navigation page with new data

export default function UserUpdate({ navigation }) {
    const {userData} = useContext(UserContext).state;
    const { id, username, nickname, email, photo, city_id, joined_date, last_logged_in, player_rating } = userData.userInfo;
    const { setUserData } = useContext(UserContext).actions;
    console.log(id);

    const [newUsername, setNewUsername] = useState(username);
    const [newNickname, setNewNickname] = useState(nickname);
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState(email);
    const [newPhoto, setNewPhoto] = useState(photo);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true, quality: 0.5, aspect:[100, 100]});

        if (pickerResult.cancelled === true) {
            return;
          }
      
          setNewPhoto("data:image/png;base64," + pickerResult.base64);
          setShowSpinner(false);
    }
    
    const updateUser = async () => {
        const userObject = {
            "user": {
                id,
                username: newUsername,
                nickname: newNickname,
                password: newPassword || password,
                email: newEmail,
                photo: newPhoto,
                city_id,
                joined_date,
                last_logged_in,
                player_rating
            }
        }
        const url = `${URL}/users/`;
        const response = await axios.put(url, userObject);
        setUserData(response.data);
        return false;
    };

    // const postSports = async (id) => {
    //     const url = `${URL}/favorite-sports/`;
    //     const sportsArrayObject = {favoriteSports:sportsArray.map(sport => {return {...sport, user_id: id}})};
    //     const response = await axios.post(url, sportsArrayObject);
    //     // add error handling here
    // };

    // const postSignupData = async () => {
    //     const id = await postUser();
    //     postSports(id);
    //     return false; // change this for error handling
    // }

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
                            <Input
                            name="username"
                            placeholder={newUsername}
                            value={newUsername}
                            onChangeText={(text) => setNewUsername(text)}/>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                Nickname:
                            </Text>
                        </Left>
                        <Body>
                            <Input
                            name="nickname"
                            placeholder={newNickname}
                            value={newNickname}
                            onChangeText={setNewNickname}/>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                Email:
                            </Text>
                        </Left>
                        <Body>
                            <Input
                            name="email"
                            placeholder={newEmail}
                            value={newEmail}
                            onChangeText={setNewEmail}/>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                Password:
                            </Text>
                        </Left>
                        <Body>
                            <Input
                            name="password"
                            placeholder={newPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}/>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Picture:</Text>
                        </Left>
                        <Body>
                            {showSpinner ? <Spinner /> : null}
                            {newPhoto ? <Thumbnail large source={{ uri: newPhoto }} /> : null}
                            <Button primary onPress={() => {openImagePickerAsync();setShowSpinner(true)}}>
                                <Text>Update Photo</Text>
                            </Button>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                City:
                            </Text>
                        </Left>
                        <Body>
                            <Button onPress={() => {navigation.navigate('City Update')}}>
                                <Text>Update City</Text>
                            </Button>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>
                                Favorite Sports:
                            </Text>
                        </Left>
                        <Body>
                            <Button onPress={() => {navigation.navigate('Favorite Sports Update')}}>
                                <Text>Update Favorite Sports</Text>
                            </Button>
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
                        setIsSubmitting(true);
                        const wasSubmitted = await updateUser();
                        setIsSubmitting(wasSubmitted);
                        !wasSubmitted ? navigation.navigate('Profile') : console.log('error in submission');
                    }}
                    >
                        <Text>Submit</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );

}
