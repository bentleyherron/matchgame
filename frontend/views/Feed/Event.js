import React from 'react';
import { Text, Card, CardItem, H1, Button, Left, Right, Body} from 'native-base';

export default function Event({event, expandEvent}) {
    const { title,
            location,
            date,
            teams,
            wager } = event;
    const formattedDate = date ? `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} | ${date.getHours()}:00` : null;
    return (
        <Card
            style={{padding: 5}} 
            onPress={() => expandEvent(event)}>
            <CardItem header>
                <Body>
                    <Text>{title}</Text>
                    <Text note>{formattedDate ? formattedDate : null}</Text>
                    <Text note>{teams.join(', ')} </Text>
                    <Text note>{location}</Text>
                </Body>
                <Right><Button rounded><Text>50 POINTS</Text></Button></Right>
            </CardItem>
        </Card>
    );
}