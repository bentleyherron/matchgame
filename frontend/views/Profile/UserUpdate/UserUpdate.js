import React, { useState, useEffect, useContext } from 'react';
import { Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Container, Label, List, ListItem, Left, Body, Right, Text, Button, Footer, FooterTab, Content, Spinner, Input, Thumbnail, Toast } from 'native-base';
import axios from 'axios';
import { URL } from 'react-native-dotenv';
import UserContext from '../../../UserContext';

export default function UserUpdate({ navigation }) {
    const {userData, userToken} = useContext(UserContext).state;
    const { id, username, nickname, email, photo, city_state } = userData.userInfo;
    const { setUserData } = useContext(UserContext).actions;

    const [newUsername, setNewUsername] = useState(username);
    const [newNickname, setNewNickname] = useState(nickname);
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState(email);
    const [newPhoto, setNewPhoto] = useState(photo);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [userId, setUserId] = useState(null);

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

    useEffect(() => {
        setUserId(id);
    }, [])
    
    const updateUser = async () => {
        if (userId) {
            let userObject = {
                "user": {
                    id: userId
                }
            }
    
            username !== newUsername ? userObject = {"user": {...userObject.user, username: newUsername}} : console.log('username not changed');
            nickname !== newNickname ? userObject = {"user": {...userObject.user, nickname: newNickname}} : console.log('nickname not changed');
            email !== newEmail ? userObject = {"user": {...userObject.user, email: newEmail}} : console.log('email not changed');
            photo !== newPhoto ? userObject = {"user": {...userObject.user, photo: newPhoto}} : console.log('photo not changed');
            newPassword ? userObject = {"user": {...userObject.user, password: newPassword}} : console.log('password not changed');
            const url = `${URL}/users/`;
            try{
                const response = await axios.put(url, userObject);
            }catch{
                Toast.show({
                    text: "Unable to update user",
                    buttonText: "Okay"
                });
                setTimeout(() => {
                    navigation.navigate('Profile')
                }, 5000)
            }
            return false;
        }
    };

    const deleteAccount = () => {
        axios.delete(`${URL}/users/${userId}`, {
            headers: {
                "x-access-token": userToken
            }
            })
            .then(
                r => {
                    navigation.navigate('Signup');
                }
            )
            .catch(() => {
                Toast.show({
                    text: "Unable to delete account",
                    buttonText: "Okay"
                });
                setTimeout(() => {
                    navigation.navigate('User Profile')
                }, 3000)
            })
        }

    const styles = StyleSheet.create({
        LinkButtons: {
            color: "#ffffff",
            padding: 15,
            marginTop: 5,
            borderRadius: 15,
            backgroundColor: '#fafafa',
            justifyContent: "space-around"
        },
    })

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
                            <Left>
                                <Text>Picture:</Text>
                            </Left>
                            <Body>
                                {newPhoto ? <Thumbnail large source={{ uri: newPhoto }} /> : null}
                            </Body>
                        </Left>
                        <Body>
                            {showSpinner ? <Spinner /> : null}
                            <Button primary onPress={() => {openImagePickerAsync();setShowSpinner(true)}}>
                                <Text>Update Photo</Text>
                            </Button>
                        </Body>

                    </ListItem>
                    <ListItem>
                        <Left>
                            <Left>
                                <Text>
                                    City:
                                </Text>
                            </Left>
                            <Body>
                                <Text>
                                    {userData.teams[0].city_state}
                                </Text>
                            </Body>
                        </Left>
                        <Body>
                            <Button onPress={() => {navigation.navigate('City Update')}}>
                                <Text>Update City</Text>
                            </Button>
                        </Body>
                    </ListItem>
                    {/* <ListItem>
                        <Left>
                            <Text>
                                Favorite Sports:
                            </Text>
                        </Left>
                        <Body>
                            <Button style={styles.LinkButtons} onPress={() => {navigation.navigate('Sport Update')}}>
                                <Text>Update Favorite Sports</Text>
                            </Button>
                        </Body>
                    </ListItem> */}
                    {/* <ListItem>
                        <Left>
                            <Label>Delete Account</Label>
                        </Left>
                        <Body>
                            <Button danger onPress={() => {deleteAccount()}}>
                                <Text>Submit</Text>
                            </Button>
                        </Body>
                    </ListItem> */}
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
                        !wasSubmitted ? navigation.navigate('User Profile') : console.log('error in submission');
                    }}
                    >
                        <Text>Submit</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );

}
