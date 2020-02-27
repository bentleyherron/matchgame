import React from 'react';
import { Card, CardItem, Header, Body, H1, Text, car } from 'native-base';

export default function Challenge({challenge}) {
    const {teamFrom, teamTo, date, wager, message} = challenge;
    const formattedDate = `Date: ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} at ${date.getHours()}:00`
    return (
        <Card>
            <CardItem header>
                <H1>{teamFrom} challenges {teamTo}</H1>
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