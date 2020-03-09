import React, {useState, useContext, useEffect} from 'react';
import Event from './Event';
import { FlatList } from 'react-native';
import { Content, Header, Tab, Tabs, Container, Spinner } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';

export default function EventsContainer() {

    const [eventArray, setEventArray] = useState('');
    const [completeEventArray, setCompleteEventArray] = useState('');
    const [eventTeamsArray, setEventTeamsArray] = useState('');

    const { userData, favoriteSports } = useContext(UserContext).state;

    const getEventTeams = (event_id) => {
        return axios.get(`${URL}/events/${event_id}`)
      }

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
                console.log(response);
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
                    console.log(r);
                    setEventTeamsArray(r);
                })
                
        }
    }, [eventArray])


    useEffect(() => {
        if (eventTeamsArray) {
            let newArray = [...eventArray];
            for (let i = 0; i < eventArray.length; i++) {
                newArray[i].teamNames = eventTeamsArray[i];
            }
            setCompleteEventArray(newArray);
        }
    }, [eventTeamsArray])

    return (
        <Container>
            { completeEventArray ? (
                <FlatList
                style={{padding: 5}}
                data={completeEventArray}
                renderItem={ ({ item }) => (
                    <Event
                    keyExtractor={item.id}
                    eventObject={item}
                    />
                )}
                />
            ) : <Spinner />}
        </Container>
        
    );
}