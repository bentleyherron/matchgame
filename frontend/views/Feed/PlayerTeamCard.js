import React from 'react';
import {Text, Card, CardItem, Left, Body, Right, Title, Thumbnail} from 'native-base';

export default function PlayerTeamCard({cardData}) {
    const { photo, name, sports, rating } = cardData;
    return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: photo}} />
                </Left>
                <Right>
                    <Text>{name}</Text>
                </Right>
            </CardItem>
            <CardItem>
                <Left>
                    <Text>Sports:</Text>
                </Left>
                <Body>
                    {sports.map((item, i) => <Text key={i + "J"}>{item}</Text>)}
                </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Text>Rating:</Text>
                </Left>
                <Body>
                    <Text>{rating}</Text>
                </Body>
            </CardItem>
        </Card>
    );
}