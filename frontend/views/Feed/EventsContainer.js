import React, {useState, useContext, useEffect} from 'react';
import Event from './Event';
import { FlatList, StyleSheet } from 'react-native';
import { Content, Header, Tab, Tabs, Container, Spinner, Toast } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import UserContext from '../../UserContext';
import EventPage from './EventPage';

export default function EventsContainer({page}) {

    const [eventArray, setEventArray] = useState('');
    const [eventClicked, setEventClicked] = useState(false);
    const [eventIdClicked, setEventIdClicked] = useState(null);
    const [currentEventPageInfo, setCurrentEventPageInfo] = useState(null);

    const { userData, favoriteSports, userToken } = useContext(UserContext).state;

    const getAllEventInfo = () => {
        axios.get(`${URL}/events/city/${userData.userInfo.city_id}`, {
            headers: {
                "x-access-token": userToken
            }
            })
        .then((response) => {
            setEventArray(response.data)
        })
        .catch(() => {
            Toast.show({
                text: "Unable to access the database",
                buttonText: "Okay"
            })
            setTimeout(() => {
                navigation.navigate('Profile')
            }, 5000)
        })
    };

    const handleEventClick = (eventId) => {
        setEventClicked(!eventClicked);
        console.log(`Event Id Clicked: ${eventId}`)
        setEventIdClicked(eventId);
        
    }

    const updateCurrentPage = (eventIdClicked) => {
        const currentPageContent = eventArray.filter((event) => {
            return event.event.id === eventIdClicked;
        });
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

    const styles = StyleSheet.create({
        eventsContainer: {
            backgroundColor: '#fcfbfc'
        }
    });

    return (
        <Container style={styles.eventsContainer}>
            { eventArray && !eventClicked ? (
                <FlatList
                style={{padding: 5}}
                data={eventArray}
                renderItem={ ({ item }) => (
                    <Event
                    key={item.id + "event"}
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