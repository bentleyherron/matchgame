import React, { useState, useEffect, useContext } from 'react';
import { Container, Content, ListItem, Text, Radio, Button, Right, Left, Footer, FooterTab, Toast } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
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

    const postFavSports = () => {
        // put = sport_id and user_id,
        // del = id, user_id

        // delete favorite sports
        try{
            const sportsToDelete = favoriteSports.filter(obj => !sportsList[obj.sport_id])[0];
            axios.delete(`${URL}/favorite-sports/`, {data:{favoriteSports: sportsToDelete}, 
                headers: {
                  "x-access-token": userToken
                }
              }).then(
                r => navigation.navigate('User Profile')
            )
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <Container>
            <Content>
            {
                sportData && sportsList ? sportData.map((sport) => {
                    return (
                        <ListItem onPress={() => updateSportList(sport.id)} key={sport.id + 'r'}>
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