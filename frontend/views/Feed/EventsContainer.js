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

    const { userData, favoriteSports, userToken } = useContext(UserContext).state;

    const getAllEventInfo = () => {
        // change the 11 below to ${userData.userInfo.city_id}
        try{
            axios.get(`${URL}/events/city/${userData.userInfo.city_id}`, {
                headers: {
                  "x-access-token": userToken
                }
              })
            .then((response) => {
                setEventArray(response.data)
            })
        } catch(err) {
            console.log(err);
        }
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
        getAllEventInfo();
    },[])

    return (
        <Container>
            { completeEventArray && !eventClicked ? (
                <FlatList
                style={{padding: 5}}
                data={eventArray}
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