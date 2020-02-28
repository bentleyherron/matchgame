import React from 'react';
import { Card, CardItem, H1, Text } from 'native-base';

export default function Challenge({ challenge, expandChallenge }) {
    const { teamFrom,
            teamTo,
            date,
            wager,
            message } = challenge;
    const formattedDate = `Date: ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} at ${date.getHours()}:00`
    return (
        <Card onPress={() => expandChallenge()}>
            <CardItem header>
                <H1>Team {teamFrom} has issued a challenge to Team {teamTo}</H1>
            </CardItem>
            <CardItem cardBody>
                    {wager ? <Text>Wager: {wager}</Text> : null}
            </CardItem>
            <CardItem cardBody>
                    <Text>{formattedDate}</Text>
            </CardItem>
            <CardItem cardBody>
                    <Text>{message}</Text>
            </CardItem>
        </Card>
    );
}