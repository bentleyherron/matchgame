import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Card, CardItem, ListItem, Left, Body, Right, Title, Thumbnail, Button} from 'native-base';
import {Image} from 'react-native';

export default function PlayerTeamCard({cardData, handleSelect}) {
    const { photo, username, player_rating, id } = cardData;

    const styles = StyleSheet.create({
        profileBody: {
            marginTop: 15,
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15
        },
        memberBody: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        addMemberButton: {
            justifyContent: 'center',
            backgroundColor: '#02A456'
        },
        memberPhotoContainer: {
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    return (
        <Card style={styles.profileBody}>
            <ListItem avatar style={styles.memberCard} noBorder>
                <Left style={styles.memberPhotoContainer}>
                    <Thumbnail small source={{uri: photo}} />
                </Left>
                <Body>
                    <Text>{username}</Text>
                    <Text note>Player Rating: {player_rating}</Text>
                </Body>
                <Right>
                    <Button rounded small style={styles.addMemberButton} onPress={() => handleSelect(id, username)}>
                        <Text>Add</Text>
                    </Button>
                </Right>
            </ListItem>
            {/* <CardItem>
                <Left>
                    <Text>Sports:</Text>
                </Left>
                <Body>
                    {sports.map((item, i) => <Text key={i + "J"}>{item}</Text>)}
                </Body>
            </CardItem> */}
        </Card>
    );
}