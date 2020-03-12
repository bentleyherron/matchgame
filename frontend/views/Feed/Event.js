import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { Text, Card, CardItem, H1, Button, Left, Right, Body, Spinner, Thumbnail, ListItem, Icon} from 'native-base';
import {URL} from 'react-native-dotenv';
import axios from 'axios';

export default function Event({eventObject, eventClick}) {

    const { title,
            date,
            wager,
            sport_id,
            id,
         } = eventObject.event;

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

    const sportIcons = [
        {id: 1, name: "Football", family: "FontAwesome5", icon:"football-ball"},
        {id: 2, name: "Basketball", family: "FontAwesome5", icon:"basketball-ball"},
        {id: 3, name: "Kubb", family: "FontAwesome5", icon:"crown"},
        {id: 4, name: "Darts", family: "FontAwesome5", icon:"bullseye"},
        {id: 5, name: "Ultimate Frisbee", family: "Feather", icon:"disc"},
        {id: 6, name: "Soccer", family: "MaterialCommunityIcons", icon:"soccer"},
        {id: 7, name: "Wiffle Ball", family: "MaterialCommunityIcons", icon:"baseball-ball"},
        {id: 8, name: "Softball", family: "FontAwesome5", icon:"baseball-ball"},
        {id: 9, name: "Baseball", family: "FontAwesome5", icon:"baseball-ball"},
        {id: 10, name: "Bowling", family: "FontAwesome5", icon:"bowling-ball"},
        {id: 11, name: "Kickball", family: "FontAwesome5", icon:"soccer-ball-o"},
        {id: 12, name: "Beer Pong", family: "MaterialCommunityIcons", icon:"beer"},
        {id: 13, name: "Cornhole", family: "MaterialCommunityIcons", icon:"corn"},
        {id: 14, name: "Volleyball", family: "FontAwesome5", icon:"volleyball-ball"},
        {id: 15, name: "Bocce Ball", family: "MaterialCommunityIcons", icon:"tennis-ball"},
        {id: 16, name: "Ping Pong", family: "FontAwesome5", icon:"table-tennis"},
        {id: 17, name: "Golf", family: "MaterialCommunityIcons", icon:"golf"},
        {id: 18, name: "Tennis", family: "MaterialCommunityIcons", icon:"tennis"},
        {id: 19, name: "Lacrosse", family: "MaterialCommunityIcons", icon:"hockey-sticks"}
      ]

    return (
        
        <ListItem
            style={styles.listItem}
            avatar
            onPress={() => eventClick(id)}>
                 <Left>
                    <Icon style={{fontSize:18}} type={sportIcons[sport_id -1].family} name={sportIcons[sport_id-1].icon} />
                </Left>
                 <Body>
                    <Text>{title}</Text>
                    <Text note>{formattedDate} · {formattedTime}</Text>
                 </Body>
                 <Right><Button style={styles.seeEventButton} small rounded onPress={() => eventClick(id)}><Text>See Event</Text></Button></Right>
        </ListItem>
    );
}