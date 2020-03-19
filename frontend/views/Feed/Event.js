import React, { useState, useContext } from 'react';
import {StyleSheet} from 'react-native';
import { Text, Button, Left, Right, Body, ListItem, Icon} from 'native-base';
import UserContext from '../../UserContext';

export default function Event({eventObject, eventClick}) {

    const { title,
            date,
            wager,
            sport_id,
            id,
         } = eventObject.event;
    const [showIcon, setShowIcon] = useState(true);
    const {sportIcons, sportData} = useContext(UserContext).state

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
        const formattedTime = hours + ':' + minutes + ' ' + ampm;
        return formattedTime;
    }

    const formattedTime = formatTime(datetime);

    const styles = StyleSheet.create({
        listItem: {
            backgroundColor: '#fcfbfc'
        },
        seeEventButton: {
            backgroundColor: '#02A456'
        }
    });

    return (
        
        <ListItem
            style={styles.listItem}
            avatar
            onPress={() => eventClick(id)}>
                 <Left>
                    <Button style={{borderRadius: 15, backgroundColor: '#fafafa', justifyContent: "space-around"}}onPress={() => setShowIcon(!showIcon)}>
                        {showIcon ? 
                        <Icon style={{fontSize:18, color: "black"}} type={sportIcons[sport_id -1].family} name={sportIcons[sport_id-1].icon} />
                        :
                        <Text style={{color: "black"}}>{sportData[sport_id - 1].name}</Text>
                        }
                    </Button>
                </Left>
                 <Body>
                    <Text>{title}</Text>
                    <Text note>{formattedDate} · {formattedTime}</Text>
                 </Body>
                 <Right><Button style={styles.seeEventButton} small rounded onPress={() => eventClick(id)}><Text>See Event</Text></Button></Right>
        </ListItem>
    );
}