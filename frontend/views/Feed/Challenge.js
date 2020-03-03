import React from 'react';
import { Card, CardItem, H1, Text, Body, Left, Right, Button, Thumbnail, ListItem, Avatar } from 'native-base';

export default function Challenge({ challenge, expandChallenge }) {
    const { teamFrom,
            teamTo,
            date,
            wager,
            message } = challenge;
    // const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} at ${date.getHours()}:00`;
    const month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec'];
    
    const formattedDate = `${month[date.getMonth()]} ${date.getDate()}`;
    const formattedTime = `${date.getHours()}`;
    
    return (
        <ListItem avatar>
              <Left>
                <Thumbnail small source={require("../Profile/soccer.png")} />
              </Left>
              <Body>
                <Text>Team {teamFrom} challenged Team {teamTo} </Text>
                <Text note>{message}</Text>
                <Text note>{wager} Pts · Mar. 3 · 3:30PM </Text>
              </Body>
              <Right>
                <Text note>3:50 pm</Text>
              </Right>
        </ListItem>
    );
}