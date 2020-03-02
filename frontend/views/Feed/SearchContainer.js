import React, {useState} from 'react';
import axios from 'axios';
import { Content, Text, Header, Input, Item, Icon, Button, Segment } from 'native-base';
import { FlatList } from 'react-native';
import PlayerTeamCard from './PlayerTeamCard';

export default function SearchContainer() {
    const [input, setInput] = useState(null);
    const [searchResults, setSearchResults] = useState(fakeUserData);
    const [currentPlayerTeam, setPlayerTeam] = useState(null);
    const [topic, setTopic] = useState('Players');
    // getSearchItems = async () => {
    //     const result = await axios.get('url');
    //     setSearchResults(result.data);
    // };

    const fakeUserData = [
        {
            id: 1,
            name: 'tuser',
            joined_date: '2020-01-01',
            rating: 2,
            photo: 'https://picsum.photos/200'
        },
        {
            id: 2,
            name: 'bentley',
            joined_date: '2020-01-01',
            rating: 5,
            photo: 'https://picsum.photos/200'
        },
        {
            id: 3,
            name: 'joe',
            joined_date: '2020-01-01',
            rating: 5,
            photo: 'https://picsum.photos/200'
        },
        {
            id: 4,
            name: 'david',
            joined_date: '2020-01-01',
            rating: 5,
            photo: 'https://picsum.photos/200'
        }
    ]

    const fakeTeamData = [
        {
            id: 1,
            name: 'tuser team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 1
        },
        {
            id: 2,
            name: 'bentley team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 2
        },
        {
            id: 3,
            name: 'joe team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 3
        },
        {
            id: 4,
            name: 'david team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 4
        },
        {
            id: 5,
            name: 'All people team',
            region_id: 1,
            rating: 3,
            photo: 'https://picsum.photos/200',
            captain_id: 1
        }
    ];

    getFakeSearch = (text) => {
        const filteredResults = fakeSearchData.filter((item) => item.name.includes(text))
        setSearchResults(filteredResults);
    }

    return (
        <Content>
            <Header hasSegment>
                <Body>
                    <Segment>
                        <Button first active onPress={() => setTopic('Players')}><Text>Players</Text></Button>
                        <Button last onPress={() => setTopic('Teams')}><Text>Teams</Text></Button>
                    </Segment>
                </Body>
            </Header>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" value={input} onChangeText={setInput} />
                </Item>
                <Button transparent onPress={() => getFakeSearch(input)}>
                    <Text>Search</Text>
                </Button>
            </Header>
            <FlatList
                data={searchResults}
                renderItem={ ({ item }) => (
                    <PlayerTeamCard
                    keyExtractor={item.id}
                    cardData={item}
                    />
                )} />
            {currentPlayerTeam ? <ProfilePage  /> : null}
        </Content>
      );
}