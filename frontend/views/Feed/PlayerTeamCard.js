import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Card, CardItem, ListItem, Left, Body, Right, Title, Thumbnail} from 'native-base';
import {Image} from 'react-native';
import uuid from 'react-uuid';

export default function PlayerTeamCard({cardData, handleSelect}) {
    const { photo, username, sports, player_rating, id } = cardData;

    const styles = StyleSheet.create({
        searchCard: {
            marginTop: 10,
            borderRadius: 15,
            padding: 5,
            backgroundColor: '#ffffff'
        }
    });

    return (
        <Card style={styles.searchCard} onPress={() => {console.log('clicked item');handleSelect(id, username)}}>
            <CardItem noBorder>
                <Left>
                    {photo ? 
                    <Thumbnail source={{uri: photo}} />
                    : null}
                </Left>
                <Body>
                    <Text>{username}</Text>
                    <Text note>Rating: {player_rating} </Text>
                
                </Body>
            </CardItem>
            {/* <CardItem>
                <Left>
                    <Text>Sports:</Text>
                </Left>
                <Body>
                    {sports.map((item, i) => <Text key={uuid()}>{item}</Text>)}
                </Body>
            </CardItem> */}
        </Card>
    );
}