import React, {useState, useEffect, useContext} from 'react';
import {Container, Content, Header, Item, Input, Icon, Button, Footer, FooterTab, Text} from 'native-base';
import {FlatList} from 'react-native';

import TeamContext from './TeamContext';
import UserContext from '../../UserContext';
import PlayerTeamCard from '../Feed/PlayerTeamCard';

import axios from 'axios';
import {URL} from 'react-native-dotenv';

// make filter text check be all lowercase

export default function TeamMemberSelect({ navigation }) {
    const [searchInput, setSearchInput] = useState(null);
    const [userList, setUserList] = useState(null);
    const [currentUserList, setCurrentUserList] = useState(null);

    const {state, actions} = useContext(TeamContextValue);
    const {teamMembers} = state;
    const {handleTeamMemberAdd} = actions;

    useEffect(() => {
        if(!userList) {
            axios.get(`${URL}/users`).then(
                r => {
                    setUserList(r.data);
                    setCurrentUserList(r.data);
                }
            )
        }
    }, [])

    const filterUsers = (text) => {
        const filteredResults = userList.filter((item) => item.username.includes(text))
        setCurrentUserList(filteredResults);
    }

    return(
        <Container>
            <Content>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" value={searchInput} onChangeText={setSearchInput} />
                        <Button transparent onPress={() => filterUsers(searchInput)}>
                            <Text>Search</Text>
                        </Button>
                    </Item>
                </Header>
                <Item>
                    <H1>Select Users</H1>
                    <FlatList
                        data={currentUserList}
                        renderItem={ ({ item }) => (
                            <PlayerTeamCard
                            keyExtractor={item.id}
                            cardData={item}
                            handleSelect={handleTeamMemberAdd}
                            />
                        )} />
                </Item>
                <Item>
                    <H1>Users Selected</H1>
                    <FlatList
                        data={currentUserList}
                        renderItem={ ({ item }) => (
                            <PlayerTeamCard
                            keyExtractor={item.id}
                            cardData={item}
                            handleSelect={handleTeamMemberAdd}
                            />
                        )} />
                </Item>
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
                    onPress={() => {navigation.navigate('teamReview')}}
                    >
                    <Text>NEXT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
  );
}