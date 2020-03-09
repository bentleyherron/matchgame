import React, {useState, useEffect} from 'react';
import { Text, Card, CardItem, H1, Button, Left, Right, Body, Spinner} from 'native-base';
import {URL} from 'react-native-dotenv';
import axios from 'axios';

export default function Event({eventObject}) {

    const { title,
            date,
            teams,
            wager,
            description,
            sport_id,
         } = eventObject.event;

    const [teamNames, setTeamNames] = useState('');

    const month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec'];
    const datetime = new Date(date);
    const formattedDate = `${month[datetime.getMonth()]} ${datetime.getDate()}`;

    function addZero(i) {
        if (i < 10) {
        i = "0" + i;
        }
        return i;
    }
    
    function formatTime(d) {
        let hours = addZero(d.getHours());
        let minutes = addZero(d.getMinutes());
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        const formattedTime = hours + ':' + minutes + ' ' + ampm;
        return formattedTime;
    }

    const formattedTime = formatTime(datetime);


    return (
        
        <Card
            style={{padding: 5}} 
            onPress={() => expandEvent(event)}>
                 <CardItem header>
                 <Body>
                     <Text>{title}</Text>
                     {
                         eventObject.teamNames ? (
                             <Text>{eventObject.teamNames[0]} vs. {eventObject.teamNames[1]}</Text>
                         ) : (null)
                     }
                     <Text note>{formattedDate} · {formattedTime}</Text>
                 </Body>
                 <Right><Button rounded><Text>Wager Pts.</Text></Button></Right>
             </CardItem>
        </Card>
    );
}