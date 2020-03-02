import React from 'react';
import { Card, CardItem, H1, Text, Body, Right, Button } from 'native-base';

export default function Challenge({ challenge, expandChallenge }) {
    const { teamFrom,
            teamTo,
            date,
            wager,
            message } = challenge;
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} at ${date.getHours()}:00`
    return (
        <Card 
            style={{padding: 5}}
            onPress={() => expandChallenge()}>
            <CardItem header bordered>
                <Body>
                    <Text>Team {teamFrom} challenged Team {teamTo}</Text>
                </Body>
            </CardItem>
            <CardItem>
                <Body>
                    {wager ? <Text note>{wager} Points Wagered</Text> : null}
                    <Text note>{formattedDate}</Text>
                    <Text note>{message}</Text>
                </Body>
                <Right>
                    <Button rounded>
                        <Text>Game On</Text>
                    </Button>
                </Right>
            </CardItem>
        </Card>
    );
}