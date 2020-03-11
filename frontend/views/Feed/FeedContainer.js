import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Tab, Tabs, Text } from 'native-base';
import Leaderboard from './Leaderboard';
import ChallengesContainer from './ChallengesContainer';
import EventsContainer from './EventsContainer';
import Search from './SearchContainer';

export default function FeedContainer(){

    const [page, setPage] = useState(0);

    const styles = StyleSheet.create({
        headerContainer : {
            height: 80,
            paddingTop: 35,
            backgroundColor: '#0065ff'
        },
        logoContainer : {
            justifyContent: 'center'
        },
        matchgameLogo: {
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white'
        },
        tab: {
            backgroundColor: '#1551a9'
        }
    })

    return (
        <Container>
            <Header hasTabs style={styles.headerContainer}>
                <Text style={styles.matchgameLogo}>matchgame</Text>
            </Header>
            <Tabs page={page}>
                <Tab heading="Challenges" tabStyle={styles.tab} activeTabStyle={styles.tab}>
                    <ChallengesContainer 
                        setPage={setPage}
                    />
                </Tab>
                <Tab heading="Events" tabStyle={styles.tab} activeTabStyle={styles.tab}>
                    <EventsContainer />
                </Tab>
                <Tab heading="Leaders" tabStyle={styles.tab} activeTabStyle={styles.tab}>
                    <Leaderboard />
                </Tab>
                <Tab heading="Search" tabStyle={styles.tab} activeTabStyle={styles.tab}>
                    <Search />
                </Tab>
            </Tabs>
        </Container>
    );
}