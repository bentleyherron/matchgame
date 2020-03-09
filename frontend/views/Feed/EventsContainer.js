import React, {useState, useContext, useEffect} from 'react';
import Event from './Event';
import { FlatList } from 'react-native';
import { Content, Header, Tab, Tabs, Container } from 'native-base';
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
                return (response.data)
            })
            .then((response) => {
                axios.all(response.map((event) => {
                    return getEventTeams(event.id);
                }))
                .then(responseArr => {
                     return responseArr.map(event => {
                        return (event.data);
                    });
                })
                .then(response => {
                    console.log(response);
                    setEventArray(response);
                })
            })
    },[])

    return (
        <FlatList
        style={{padding: 5}}
        data={eventArray}
        renderItem={ ({ item }) => (
            <Event
            keyExtractor={item.id}
            eventObject={item}
            />
        )}
        />
    );
}