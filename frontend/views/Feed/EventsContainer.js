import React, {useState, useContext, useEffect} from 'react';
import Event from './Event';
import { FlatList } from 'react-native';
import { Content, Header, Tab, Tabs } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

export default function EventsContainer() {

    const [eventArray, setEventArray] = useState('');

    const { userData, favoriteSports } = useContext(UserContext).state;

    const getEventTeams = (event_id) => {
        return axios.get(`${URL}/events/${event_id}`)
      }

    useEffect(() => {
        axios.get(`${URL}/events`)
            .then((response) => {
                console.log(response.data);
                // setEventArray(response.data);
                return (response.data)
            })
            .then((response) => {
                axios.all(response.map((event) => {
                    return getEventTeams(event.id);
                }))
                .then(responseArr => {
                    responseArr.map(event => {
                        console.log(event.data)
                        return (event.data);
                    })
                })
                .then(response => {
                    setEventArray(response);
                })
            })

    },[])

    expandEvent = () => {
        console.log('you clicked the event');
    }

    return (
        <FlatList
        style={{padding: 5}}
        data={eventArray}
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