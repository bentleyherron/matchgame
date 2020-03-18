import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Header, Item, Card, CardItem, Input, Icon, Button, Footer, FooterTab, H1, Text, Body, Left, Right, Toast, Spinner } from 'native-base';
import {FlatList} from 'react-native';

import TeamContext from './TeamContext';
import UserContext from '../../UserContext';
import PlayerTeamCard from './PlayerTeamCard';

import axios from 'axios';
import {URL} from 'react-native-dotenv';

// make filter text check be all lowercase
// make a different function for adding members and removing members

export default function TeamMemberSelect({ navigation }) {
    const [searchInput, setSearchInput] = useState(null);
    const [userList, setUserList] = useState(null);
    const [currentUserList, setCurrentUserList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {userToken, userData} = useContext(UserContext).state;
    const {state, actions} = useContext(TeamContext);
    const {teamMembers} = state;
    const {handleTeamMemberAdd} = actions;

    // make add team member and remove team member individual buttons
    useEffect(() => {
        if(!userList) {
            setIsLoading(true);
            axios.get(`${URL}/users/city/${userData.userInfo.city_id}`, {headers: {"x-access-token": userToken}})
            .then(
                r => {
                    const otherUsers = r.data.filter(obj => obj.id !== userData.userInfo.id)
                    setUserList(otherUsers);
                    setCurrentUserList(otherUsers);
                    setIsLoading(false);
                }
            ).catch(() => {
                Toast.show({
                    text: "Error occurred. Try again later",
                    buttonText: "Okay"
                });
                setTimeout(() => {
                    navigation.navigate('Signup')
                }, 5000);
            })
        }
    }, [])

    const filterUsers = (text) => {
        const filteredResults = userList.filter((item) => item.username.includes(text))
        setCurrentUserList(filteredResults);
    }

    const convertTeamMembers = (obj) => {
        const newArr = Object.keys(obj).map(item => {return {id: item, name: obj[item]}});
        return newArr;
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fafafa'
        },
        userSelectContainer: {
            marginLeft: 15,
            marginRight: 15,
            padding: 15,
            backgroundColor: '#ffffff',
            borderRadius: 15
        },
        userSelectContent: {
            flexDirection: 'column',
            backgroundColor: '#ffffff',
        }
    });

    if (isLoading) {
        return (
            <Container>
                <Content>
                    <Spinner />
                </Content>
            </Container>
        )
    }

    return(
        <Container>
            <Content style={styles.container} showsVerticalScrollIndicator={false}>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" value={searchInput} onChangeText={setSearchInput} onSubmitEditing={() => filterUsers(searchInput)} />
                        <Button transparent onPress={() => filterUsers(searchInput)}>
                            <Text>Search</Text>
                        </Button>
                    </Item>
                </Header>
                    <Card style={styles.userSelectContainer}>
                        <CardItem>
                            <Text style={{fontWeight: 'bold'}}>Users Selected</Text>
                        </CardItem>
                        <CardItem>
                            <FlatList
                                data={convertTeamMembers(teamMembers)}
                                renderItem={ ({ item }) => (
                                    <Item keyExtractor={item.id} style={{marginTop: 10, paddingBottom: 10}}>
                                        <Left>
                                            <Text>
                                                {item.name}
                                            </Text>
                                        </Left>
                                        <Right>
                                            <Button rounded warning small onPress={() => handleTeamMemberAdd(item.id, item.name)}>
                                                <Text>
                                                    Remove
                                                </Text>
                                            </Button>
                                        </Right>
                                    </Item>
                                )} />
                        </CardItem>
                    </Card>
                {isLoading ? <Spinner /> : 
                <Content>
                    <FlatList
                        data={currentUserList}
                        renderItem={ ({ item }) => (
                            <PlayerTeamCard
                            keyExtractor={item.id}
                            cardData={item}
                            handleSelect={handleTeamMemberAdd}
                            />
                        )} />
                </Content>}
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
                        onPress={() => {navigation.navigate('teamReview')}}
                        >
                        <Text style={{fontSize: 15}}>NEXT</Text>
                        </Button>
                    </FooterTab>
                </Footer>
        </Container>
  );
}