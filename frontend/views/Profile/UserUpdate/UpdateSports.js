import React, { useState, useEffect, useContext } from 'react';
import { Container, Content, ListItem, Text, Radio, Button, Right, Left, Footer, FooterTab, Toast } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import uuid from 'react-uuid';
import UserContext from '../../../UserContext';


// UNFINISHED
// fix toast message and post/delete favorite sports for player
// update when database is functional to make sure delete function and post function work
export default function UpdateSports({ navigation }) {

    const {userData, sportData, userToken} = useContext(UserContext).state;
    const {userInfo, favoriteSports} = userData;
    const [sportsList, setSportsList] = useState(null);

    const createSportObj = (arr) => {
        const newSportObj = {};
        arr.forEach(obj => {
            if(!newSportObj[obj.sport_id]) {
                newSportObj[obj.sport_id] = true;
            }
        })
        return newSportObj;
    }
    
    useEffect(() => {
        favoriteSports ? setSportsList(createSportObj(favoriteSports)) : console.log('error: no favorite sports');
    }, [])

    const updateSportList = (id) => {
        if (sportsList) {
            if (sportsList[id]) {
                const newSportsList = {...sportsList};
                delete newSportsList[id];
                setSportsList(newSportsList);
            } else {
                const newSportsList = {...sportsList};
                newSportsList[id] = true;
                setSportsList(newSportsList);
            }
        }
    }
    // console.log(userToken);

    const postFavSports = () => {
        // delete favorite sports
        const sportsToDelete = favoriteSports.filter(obj => !sportsList[obj.sport_id]);
        const formattedSportsToDelete = sportsToDelete.map(obj => {return {id: favoriteSports.find(sport => sport.sport_id === obj.sport_id).id, user_id: userInfo.id}});
        if (formattedSportsToDelete.length) {
            axios.delete(`${URL}/favorite-sports/user/`, {data:{favoriteSports: formattedSportsToDelete}, headers: {"x-access-token": userToken}})
            .catch((err) => console.log(err));
        }
        
        // post new favorite sports
        const favoriteSportsObj = {};
        favoriteSports.forEach(obj => {favoriteSportsObj[obj.sport_id] = true});
        const sportsToAdd = sportData.filter(obj => sportsList[obj.id] && !favoriteSportsObj[obj.id]);
        const formattedSportsToAdd = sportsToAdd.map(obj => {return {sport_id: obj.id, user_id: userInfo.id}});
        if (formattedSportsToAdd.length) {
            axios.post(`${URL}/favorite-sports/`, {favoriteSports: formattedSportsToAdd}, {headers: {"x-access-token": userToken}})
            .then(r => navigation.navigate('User Profile'))
            .catch(() => {
                Toast.show({
                    text: "Unable to access the database",
                    buttonText: "Okay"
                })
            })
        }
    }

    return(
        <Container>
            <Content>
            {
                sportData && sportsList ? sportData.map((sport) => {
                    return (
                        <ListItem onPress={() => updateSportList(sport.id)} key={uuid()}>
                            <Left>
                                <Text>{sport.name}</Text>
                            </Left>
                            <Right>
                                <Radio selected={sportsList[sport.id]} />
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
                        if(Object.keys(sportsList)) {
                            postFavSports();
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