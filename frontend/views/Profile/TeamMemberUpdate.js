import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Header, Item, Card, CardItem, Input, Icon, Button, Footer, FooterTab, H1, Text, Body, Left, Right, Toast, Spinner } from 'native-base';
import {FlatList} from 'react-native';

import UserContext from '../../UserContext';
import PlayerTeamCard from '../TeamCreate/PlayerTeamCard';

import axios from 'axios';
import {URL} from 'react-native-dotenv';

export default function TeamMemberUpdate({ route, navigation }) {
    const { members, teamId } = route.params;
    const [searchInput, setSearchInput] = useState(null);
    const [userList, setUserList] = useState(null);
    const [currentUserList, setCurrentUserList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [teamMembers, setTeamMembers] = useState(members);

    const {state, actions} = useContext(UserContext);
    const {userToken, userData} = state;
    const {setShouldRefresh} = actions;
    console.log(teamMembers);
    const handleTeamMemberAdd = (id, username) => {
        if(!teamMembers[id]) {
            const newTeamMembers = {...teamMembers};
            newTeamMembers[id] = username;
            setTeamMembers(newTeamMembers);
        }
    }

    const handleTeamMemberDel = (id) => {
        if(teamMembers[id]) {
            const newTeamMembers = {...teamMembers};
            delete newTeamMembers[id];
            setTeamMembers(newTeamMembers)
        }
    }

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

    const handleSubmit = async () => {
        deleteTeamMembers();
        postTeamMembers();
        navigation.navigate('User Profile');
        setShouldRefresh(currentState => !currentState);
    }

    const deleteTeamMembers = async () => {
        const membersToDel = [];
        Object.keys(members).forEach(id => teamMembers[id] ? null : membersToDel.push(id)); 
        const delMembers = membersToDel.map(id => {return {teamMember: {player_id: parseInt(id, 10), team_id: teamId}}});
        console.log(delMembers);
        Promise.all(delMembers.map(obj => axios.delete(`${URL}/team-members/`, obj, {headers: {"x-access-token": userToken}})))
        .catch(err => {console.log(err); console.log('member delete failed');Toast.show({text: "Team members not removed properly", buttonText: "Okay"})});
    }

    const postTeamMembers = async () => {
        const membersToAdd = [];
        Object.keys(teamMembers).forEach(id => members[id] ? null : membersToAdd.push(id));
        const postMembers = membersToAdd.map(id => {return {teamMember: {player_id: parseInt(id, 10), team_id: teamId}}});
        console.log(postMembers);
        axios.post(`${URL}/team-members/`, {teamMembers: postMembers}, {headers:{"x-access-token": userToken}})
        .catch((err) => {
            console.log(err);
            console.log("Team member add failed")
            Toast.show({
                text: "Team members not added properly",
                buttonText: "Okay"
            });
        })
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
                                            <Button rounded warning small onPress={() => handleTeamMemberDel(item.id)}>
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
                        onPress={() => handleSubmit()}
                        >
                        <Text style={{fontSize: 15}}>Submit</Text>
                        </Button>
                    </FooterTab>
                </Footer>
        </Container>
  );
}