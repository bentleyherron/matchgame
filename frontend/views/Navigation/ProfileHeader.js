import React from 'react';
import { StyleSheet, StatusBar} from 'react-native';
import { Header, Grid, Row, Col, Left, Body, Right, Button, Text } from 'native-base';
import { withTheme } from 'react-native-elements';
export default function ProfileHeader({navigation}) {

    const styles = StyleSheet.create({
        headerContainer : {
            height: 110, 
            marginTop:StatusBar.currentHeight,
            flexDirection: 'column', 
            marginTop:StatusBar.currentHeight,
            paddingTop: 12,
            borderWidth: 0,
            backgroundColor: '#0065ff',
            paddingLeft: 0,
            paddingRight: 0
        },
        logoContainer : {
            justifyContent: 'center',
            paddingBottom: 1
        },
        matchgameLogo: {
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
        },
        profileButtonsContainer : {
            height: 50,
            justifyContent: 'space-around',
            paddingBottom: 3,
            backgroundColor: '#1551a9',
            marginLeft: 0
        },
        profileButtonText : {
            color: 'white'
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
                        <Text style={styles.profileButtonText} uppercase={false}>Your Profile</Text>
                    </Button>
                    <Button transparent onPress={() => navigation.navigate('Team Profile')}>
                        <Text style={styles.profileButtonText} uppercase={false}>
                            Your Teams
                        </Text>
                    </Button>
                </Row>
            </Grid>
        </Header>
    );
}