import React, {useState, useEffect, useContext} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Container, Content, Form, Item, Input, Picker, Spinner, Text, Button, Icon, Footer, FooterTab, Body, Left, Right, Thumbnail} from 'native-base';
import {Image, StyleSheet} from 'react-native';

import axios from 'axios';
import { URL } from 'react-native-dotenv';
import uuid from 'react-uuid';
import UserContext from '../../UserContext';

export default function TeamCreateProfile({route, navigation}) {
    const { team } = route.params;
    const [teamName, setTeamName] = useState(team.team_name);
    const [teamSport, setTeamSport] = useState(team.sport_id);
    const [teamPhoto, setTeamPhoto] = useState(team.team_photo);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {state, actions} = useContext(UserContext);
    const {sportData, userToken} = state;
    const {setShouldRefresh} = actions;

    const postUpdatedTeam = async () => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            axios.put(`${URL}/teams/${team.team_id}`, {
                "team": {
                    id: team.team_id,
                    name: teamName,
                    sport_id: teamSport,
                    photo: teamPhoto
                }
            }, {headers:{"x-access-token": userToken}})
            .then(
                r => {
                    setIsSubmitting(false);
                    navigation.navigate('User Profile');
                    setShouldRefresh(currentState => !currentState);
                    }
            )
            .catch((err) => {
                console.log(err);
                Toast.show({
                    text: "Error occurred. Try again later",
                    buttonText: "Okay"
                });
            })
        }
    }

    const imagePickerAsync = async() => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if(permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true, quality: 0.2, aspect:[100, 100]});
        if(pickerResult.cancelled === true) {
            return;
        }
        setTeamPhoto("data:image/png;base64," + pickerResult.base64);
    }
    
    const styles = StyleSheet.create({
    pickPhotoButton: {
        justifyContent: 'center',
        backgroundColor: '#02A456'
    },
    teamPhoto: {
        marginRight: 15
    }
    });

    return(
        <Container>
        <Content>
            <Form>
                <Item fixedLabel>
                <Input 
                    placeholder='Team Name'
                    name="Team Name"
                    onChangeText={text => setTeamName(text)}
                    value={teamName}
                    />
                </Item>
                <Item picker style={{paddingLeft: 15}}>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Sport"
                        selectedValue={teamSport}
                        onValueChange={setTeamSport}>
                            {sportData.length ? sportData.map((obj, index) => (
                                <Picker.Item label={obj.name} value={obj.id} key={uuid()} />
                            )) : null}
                    </Picker>
                </Item>
                <Item style={{paddingTop: 10, paddingBottom: 10}}>
                    <Body>
                        <Button rounded style={styles.pickPhotoButton} onPress={() => {imagePickerAsync()}} >
                            <Text>Pick a team photo</Text>
                        </Button>
                    </Body>
                    <Right>
                        {teamPhoto ? <Thumbnail large style={styles.teamPhoto} source={{uri: teamPhoto}} /> : null}
                    </Right>
                </Item>
            </Form>
        </Content>

        <Footer>
          <FooterTab>
            <Button
            onPress={postUpdatedTeam}
            >
              <Text style={{fontSize: 15}}>Submit Updates</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
}