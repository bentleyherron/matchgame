import React, {useState} from 'react';
import axios from 'axios';
import { Content, Text, Header, Input, Left, Right, Item, Icon, Button, Segment } from 'native-base';
import { FlatList } from 'react-native';
import PlayerTeamCard from './PlayerTeamCard';
import {URL} from 'react-native-dotenv';

export default function SearchContainer() {
    const [input, setInput] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [currentPlayerTeam, setPlayerTeam] = useState(null);
    const sports = ['Football', 'Basketball', 'Kubb', 'Darts', 'Ultimate Frisbee', 'Soccer', 'Wiffle Ball', 'Softball', 'Baseball', 'Bowling', 'Kickball', 'Beer Pong', 'Cornhole', 'Volleyball', 'Bocce Ball', 'Ping Pong', 'Golf', 'Tennis'];
    // const getUsers = async () => {
    //     const url = `${URL}`;
    //     const userResults = axios.get(url + '/users')
    //         .then(results => {
    //             results.forEach(item => {
    //                 item.sports = axios.get(`${url}/favorite-sports/`)
    //             })
    //         })
    //     const favoriteSports = await axios.get(url + 'favorite-sports/player');
    //     setSearchResults(results.data)
    // }
    
    const fakeUserData = [
        {
            id: 1,
            name: 'tuser',
            joined_date: '2020-01-01',
            rating: 2,
            photo: 'https://picsum.photos/200',
            sports: ['volleyball', 'tennis', 'kubb']
        },
        {
            id: 2,
            name: 'bentley',
            joined_date: '2020-01-01',
            rating: 5,
            photo: 'https://picsum.photos/200',
            sports: [ 'tennis', 'kubb']
        },
        {
            id: 3,
            name: 'joe',
            joined_date: '2020-01-01',
            rating: 5,
            photo: 'https://picsum.photos/200',
            sports: ['beer pong', 'soccer']
        },
        {
            id: 4,
            name: 'david',
            joined_date: '2020-01-01',
            rating: 5,
            photo: 'https://picsum.photos/200',
            sports: ['volleyball', 'tennis', 'running']
        }
    ]

    const fakeTeamData = [
        {
            id: 1,
            name: 'tuser team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 1,
            sports: ['volleyball', 'tennis', 'kubb']
        },
        {
            id: 2,
            name: 'bentley team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 2,
            sports: [ 'tennis', 'kubb']
        },
        {
            id: 3,
            name: 'joe team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 3,
            sports: ['beer pong', 'soccer']
        },
        {
            id: 4,
            name: 'david team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 4,
            sports: ['darts', 'cornhole']
        },
        {
            id: 5,
            name: 'All people team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 1,
            sports: ['soccer']
        }
    ];

    const getFakeSearch = (text) => {
        const filteredResults = searchResults.filter((item) => item.name.includes(text))
        setSearchResults(filteredResults);
        setIsSearching(false);
    }

    return (
        <Content>
            {isSearching ? (
                <Header searchBar>
                    <Item>
                        <Icon name="ios-search" />
                        <Input  value={input} onChangeText={setInput} />
                        <Button transparent onPress={() => getFakeSearch(input)}>
                            <Text>Search</Text>
                        </Button>
                    </Item>
                </Header>
            ) :
            (
                <Header hasSegment>
                    <Left>
                        <Segment>
                            <Button first onPress={() => setSearchResults(fakeUserData)}><Text>Players</Text></Button>
                            <Button last onPress={() => setSearchResults(fakeTeamData)}><Text>Teams</Text></Button>
                        </Segment>
                    </Left>
                    <Right>
                        <Button transparent onPress={() => setIsSearching(true)}>
                            <Icon name="search" />
                        </Button>
                    </Right>
                </Header>
            )
            
        }
            <FlatList
                data={searchResults}
                renderItem={ ({ item }) => (
                    <PlayerTeamCard
                    keyExtractor={item.id}
                    cardData={item}
                    />
                )} />

            {/* {searchResults ? <Text>{searchResults[0].username}</Text> : null} */}
            {/* {currentPlayerTeam ? <ProfilePage  /> : null} */}
        </Content>
      );
}