import React, {useState, useContext, useEffect} from 'react';
import Event from './Event';
import { FlatList, StyleSheet } from 'react-native';
import { Content, Header, Tab, Tabs, Container, Spinner, Toast, Icon, Picker } from 'native-base';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import uuid from 'react-uuid';
import UserContext from '../../UserContext';
import EventPage from './EventPage';

export default function EventsContainer({page}) {

    const [eventArray, setEventArray] = useState('');
    const [currentEventArray, setCurrentEventArray] = useState('')
    const [eventClicked, setEventClicked] = useState(false);
    const [eventIdClicked, setEventIdClicked] = useState(null);
    const [currentEventPageInfo, setCurrentEventPageInfo] = useState(null);
    const [resetPage, setResetPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sportSelected, setSportSelected] = useState("All");

    const { userData, userToken, sportData } = useContext(UserContext).state;
    let {favoriteSports} = userData;
    const pickerList = ["All", "Favorite Sports", ...favoriteSports];

    const getAllEventInfo = () => {
        setIsLoading(true);
        axios.get(`${URL}/events/city/${userData.userInfo.city_id}`, {
            headers: {
                "x-access-token": userToken
            }
            })
        .then((response) => {
            setEventArray(response.data);
            setCurrentEventArray(response.data);
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

    useEffect(() => {
        if (eventArray) {
            if (sportSelected === "All") {
                setCurrentEventArray(eventArray);
            } else if (sportSelected === "Favorite Sports") {
                setCurrentEventArray(eventArray.filter(obj => favoriteSports.find(el => el.sport_id === obj.event.sport_id)))
            } else {
                setCurrentEventArray(eventArray.filter(obj => obj.event.sport_id === sportSelected))
            }
        }
    }, [sportSelected]);

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
            <Content>
                {currentEventArray && !eventClicked ? (
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Favorite Sport"
                    selectedValue={sportSelected}
                    onValueChange={setSportSelected}>
                        {pickerList.map(sport => 
                            <Picker.Item label={typeof sport === "string" ? sport : sportData[sport.sport_id - 1].name} value={typeof sport === "string" ? sport : sport.sport_id} key={uuid()} />
                        )}
                </Picker>
                ) : null}
                { currentEventArray && !eventClicked ? (
                    <FlatList
                    style={{padding: 5}}
                    data={currentEventArray}
                    renderItem={ ({ item }) => (
                        <Event
                        key={uuid()}
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
            </Content>
        </Container>
        
    );
}