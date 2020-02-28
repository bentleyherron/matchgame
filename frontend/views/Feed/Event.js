import React from 'react';
import { Text, Card, CardItem, H1, } from 'native-base';

export default function Event({event, expandEvent}) {
    const { title,
            location,
            date,
            teams,
            wager } = event;
    const formattedDate = date ? `Date: ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} at ${date.getHours()}:00` : null;
    return (
        <Card onPress={() => expandEvent(event)}>
            <CardItem header>
                <H1>{title}</H1>
            </CardItem>
            <CardItem cardBody>
                    <Text>{formattedDate ? formattedDate : null}</Text>
            </CardItem>
            <CardItem cardBody>
                    {wager ? <Text>Wager: {wager}</Text> : null}
            </CardItem>
            <CardItem cardBody>
                <Text>Teams: {teams.join(', ')}</Text>
            </CardItem>
            <CardItem cardBody>
                <Text>Location: {location}</Text>
            </CardItem>
        </Card>
    );
}