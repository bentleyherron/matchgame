import React from 'react';
import { Card, CardItem, H1, Text, Body, Left, Right, Button, Thumbnail, ListItem, Avatar } from 'native-base';
import PostEvent from './PostEvent';

export default function Challenge({ challenge, setPage }) {
    const { team_from_id,
            datetime,
            wager,
            message,
            city_id,
            is_accepted,
            latitude,
            longitude,
            sport_id
           } = challenge;

    const month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec'];
    const date = new Date(datetime);
    const formattedDate = `${month[date.getMonth()]} ${date.getDate()}`;

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
      // const formattedTime = h + ":" + m;
      return formattedTime;
    }

    const formattedTime = formatTime(date);
    
    return (
        <ListItem avatar>
              <Left>
                <Thumbnail small source={require("../Profile/soccer.png")} />
              </Left>
              <Body>
                <Text>Team {team_from_id} Issued Challenge</Text>
                <Text note>{message}</Text>
                <Text note>{wager} Pts · {formattedDate} · {formattedTime}</Text>
              </Body>
              <Right>
                {/* <Text note>3:50 pm</Text> */}
                {is_accepted ? (null)
                 : (<PostEvent
                      challenge={challenge}
                      setPage={setPage}

                 
                 />)
                }
                
              </Right>
        </ListItem>
    );
}