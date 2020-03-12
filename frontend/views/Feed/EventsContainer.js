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
    const [resetPage, setResetPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { userData, favoriteSports, userToken } = useContext(UserContext).state;

    const getAllEventInfo = () => {
        setIsLoading(true);
        axios.get(`${URL}/events/city/${userData.userInfo.city_id}`, {
            headers: {
                "x-access-token": userToken
            }
            })
        .then((response) => {
            setEventArray(response.data)
            setIsLoading(false);
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
    },[resetPage, page])

    const styles = StyleSheet.create({
        eventsContainer: {
            backgroundColor: '#fcfbfc'
        }
    });

    if(isLoading) {
        return (
            <Container>
                <Spinner />
            </Container>
        )
    }

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
                    resetPage={setResetPage}
                />
            ) : (null)
            }
        </Container>
        
    );
}