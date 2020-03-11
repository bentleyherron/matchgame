import React from 'react';
import { StyleSheet} from 'react-native';
import { Header, Grid, Row, Col, Left, Body, Right, Button, Text } from 'native-base';
export default function ProfileHeader({navigation}) {

    const styles = StyleSheet.create({
        headerContainer : {
            height: 120, 
            flexDirection: 'column', 
            paddingTop: 35,
            borderWidth:1,
            backgroundColor: '#0065ff',
            paddingLeft: 0,
            paddingRight: 0
        },
        logoContainer : {
            justifyContent: 'center',
            paddingBottom: 11
        },
        matchgameLogo: {
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
        },
        profileButtonsContainer : {
            justifyContent: 'space-around',
            paddingBottom: 3,
            backgroundColor: '#1551a9',
            marginLeft: 0
        }
    });

    return (
        <Header style={styles.headerContainer}>
            <Grid>
                <Row style={styles.logoContainer}>
                    <Text style={styles.matchgameLogo}>matchgame</Text>
                </Row>
                <Row style={styles.profileButtonsContainer}>
                    <Button transparent onPress={() => navigation.navigate('User Profile')}>
                        <Text uppercase={false}>Your Profile</Text>
                    </Button>
                    <Button transparent onPress={() => navigation.navigate('Team Profile')}>
                        <Text uppercase={false}>
                            Your Teams
                        </Text>
                    </Button>
                </Row>
            </Grid>
        </Header>
    );
}