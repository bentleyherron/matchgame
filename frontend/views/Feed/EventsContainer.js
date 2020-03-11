import React, {useState, useContext, useEffect} from 'react';
import Event from './Event';
import { FlatList } from 'react-native';
import { Content, Header, Tab, Tabs, Container, Spinner } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';
import EventPage from './EventPage';

export default function EventsContainer({page}) {

    const [eventArray, setEventArray] = useState('');
    const [completeEventArray, setCompleteEventArray] = useState('');
    const [eventTeamsArray, setEventTeamsArray] = useState('');
    const [eventClicked, setEventClicked] = useState(false);
    const [eventIdClicked, setEventIdClicked] = useState(null);
    const [currentEventPageInfo, setCurrentEventPageInfo] = useState(null);

    const { userData, favoriteSports } = useContext(UserContext).state;

    const getEventTeams = (event_id) => {
        return axios.get(`${URL}/events/${event_id}`)
      }

    const getAllEventInfo = () => {
        // change the 11 below to ${userData.userInfo.city_id}
        axios.get(`${URL}/events/city/11`)
        .then((response) => {
            setEventArray(response.data)
        })
    };

    const handleEventClick = (eventId) => {
        setEventClicked(!eventClicked);
        console.log(`Event Id Clicked: ${eventId}`)
        setEventIdClicked(eventId);
        
    }

    const updateCurrentPage = (eventIdClicked) => {
        const currentPageContent = completeEventArray.filter((event) => {
            return event.event.id === eventIdClicked;
        });
        console.log(currentPageContent);
        setCurrentEventPageInfo(currentPageContent);
    }

    useEffect(() => {
        if (eventClicked) {
            updateCurrentPage(eventIdClicked);
        }
    }, [eventClicked])

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
                    // console.log(r);
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
            console.log(newArray);
            setCompleteEventArray(newArray);
        }
    }, [eventTeamsArray])

    return (
        <Container>
            { completeEventArray && !eventClicked ? (
                <FlatList
                style={{padding: 5}}
                data={completeEventArray}
                renderItem={ ({ item }) => (
                    <Event
                    keyExtractor={item.id}
                    eventObject={item}
                    eventClick={handleEventClick}
                    />
                )}
                />
            ) : null}
            { eventClicked && currentEventPageInfo ? (
                <EventPage
                    pageContent = {currentEventPageInfo[0]}
                    eventClick={handleEventClick}
                />
            ) : (null)
            }
        </Container>
        
    );
}