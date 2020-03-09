import React, {useState, useContext, useEffect} from 'react';
import Event from './Event';
import { FlatList } from 'react-native';
import { Content, Header, Tab, Tabs, Container } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

export default function EventsContainer() {

    const [eventArray, setEventArray] = useState('');
    const [eventTeamsArray, setEventTeamsArray] = useState('');

    const { userData, favoriteSports } = useContext(UserContext).state;

    const getEventTeams = (event_id) => {
        return axios.get(`${URL}/events/${event_id}`)
      }

    // const fetchTeam = async () => {
    //     try {
    //         const teamInfo = await Promise.all(
    //             eventObject.eventTeams.map(async team => {
    //                 // console.log(`Event: ${team.event_id} Team Id: ${team.team_id}`);
    //                 // const response = await axios.get(`${URL}/teams/${team.team_id}`);
    //                 return response.data;
    //             }));
    //         setTeamNames(teamInfo);
    //     } 
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    const getAllEventInfo = () => {
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
                // console.log(response);
                setEventArray(response);
            })
        })
    };

    const getSingleTeamName = async(teamObject) => {
        const teamArr = await axios.get(`${URL}/teams/${teamObject.team_id}`);
        const teamName = teamArr.data.name;
        return teamName;
    }
    
    const getTeamNames = async (eventTeamsObject) => {
        return Promise.all(
            eventTeamsObject.map((teamObject) => {
                return getSingleTeamName(teamObject);
            })
        )
    }

    const fetchEventTeamNames = async () => {
        return Promise.all(
            eventArray.map((event) => {
                return getTeamNames(event.eventTeams);
            })
        ) 
    }

    useEffect(() => {
        const getCompleteInfo = async() => {
            const eventInfo = await getAllEventInfo();
        }
        getCompleteInfo();
        
    },[]);

    useEffect(() => {
        if (eventArray) {
            fetchEventTeamNames()
                .then(r => {
                    setEventTeamsArray(r);
                })
                .then(() => {
                    for (let i = 0; i < eventArray.length; i++) {
                        for (let j = 0; j < eventTeamsArray.length; j++) {
                            if (i === j) {
                                eventArray[i].teamNames = eventTeamsArray[j];
                            }
                        }
                    }
                })
        }
    }, [eventArray])

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