import React from 'react';
import {Text, Card, CardItem, Left, Body, Right, Title, Thumbnail} from 'native-base';

export default function PlayerTeamCard({cardData}) {
    const { image, name, sports, rating } = cardData;
    return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: image}} />
                </Left>
                <Body>
                    <Title>{name}</Title>
                </Body>
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