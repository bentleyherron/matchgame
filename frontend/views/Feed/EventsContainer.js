import React from 'react';
import Event from './Event';
import { FlatList } from 'react-native';
import { Content, Header, Tab, Tabs } from 'native-base';

export default function EventsContainer() {
    const event1 = {
        id: 1,
        title: "First Event",
        sport: "kuub",
        location: "Atlanta",
        date: new Date('2020-02-15'),
        description: "Two teams that are ready to rumble",
        photo: 'https://picsum.photos/200',
        isPublic: true,
        eventOccurred: new Date('2020-02-15'),
        teams: ['sharks', 'dolphins'],
        wager: 200,
        winner: 'sharks'
    };

    const event2 = {
        id: 2,
        title: "Second Event",
        sport: 'wrestling',
        location: "Atlanta",
        date: new Date('2020-02-13'),
        description: "We compete for blood!",
        photo: 'https://picsum.photos/200',
        isPublic: true,
        eventOccurred: new Date('2020-02-13'),
        teams: ['rocket', 'psyduck'],
        wager: 350,
        winner: 'psyduck'
    };

    const event3 = {
        id: 3,
        title: "Rumble in the Jungle",
        sport: 'boxing',
        location: "Atlanta",
        date: new Date('2020-02-02'),
        description: "Ali vs Frasier",
        photo: 'https://picsum.photos/200',
        isPublic: false,
        eventOccurred: new Date('2020-02-02'),
        teams: ['ali', 'frasier'],
        wager: 1000,
        winner: 'ali'
    };

    const event4 = {
        id: 4,
        title: "Fifa grand final",
        sport: 'soccer',
        location: "Atlanta",
        date: new Date('2020-02-29'),
        description: "Ali vs Frasier",
        photo: 'https://picsum.photos/200',
        isPublic: true,
        eventOccurred: null,
        teams: ['spain', 'germany'],
        wager: 100,
        winner: null
    };

    expandEvent = () => {
        console.log('you clicked the event');
    }

    return (
        <FlatList
        style={{padding: 10}}
        data={[event1, event2, event3, event4]}
        renderItem={ ({ item }) => (
            <Event
            keyExtractor={item.id}
            event={item}
            expandEvent={expandEvent}
            />
        )}
        />
    );
}