import React from 'react';
import {Text, Card, CardItem, Left, Body, Right, Title, Thumbnail} from 'native-base';
import {Image} from 'react-native';

export default function PlayerTeamCard({cardData, handleSelect}) {
    const { photo, username, sports, player_rating, id } = cardData;
    return (
        <Card onPress={() => handleSelect(id, username)}>
            <CardItem>
                <Left>
                    <Image style={{width: 66, height: 58}} source={{uri: photo}} />
                </Left>
                <Right>
                    <Text>{username}</Text>
                </Right>
            </CardItem>
            {/* <CardItem>
                <Left>
                    <Text>Sports:</Text>
                </Left>
                <Body>
                    {sports.map((item, i) => <Text key={i + "J"}>{item}</Text>)}
                </Body>
            </CardItem> */}
            <CardItem>
                <Left>
                    <Text>Rating:</Text>
                </Left>
                <Body>
                    <Text>{player_rating}</Text>
                </Body>
            </CardItem>
        </Card>
    );
}