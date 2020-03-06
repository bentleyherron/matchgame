import React, { useState, useEffect, useContext } from 'react';
import { Container, Content, Form, Item, Input, Body, Left, Right, Radio, Button, Text, DatePicker, Picker, Icon, Header, Label, Textarea} from 'native-base';
import {URL} from 'react-native-dotenv';

import UserContext from '../../UserContext';
import axios from 'axios';

export default function TeamCreateContainer({ navigation }) {



    const sportsList = ['Football', 'Flag Football', 'Soccer', 'Volleyball', 'Kuub', 'Darts', 'Ultimate Frisbee', 'Wiffle Ball', 'Softball', 'Baseball', 'Bowling', 'Kickball', 'Bowling', 'Ping Pong', 'Beer Pong', 'Cornhole', 'Bocci', 'Shooting', 'Shuffleboard', 'Tennis', 'Quidditch' ]
    return(
            <Content>
                <Text>This is the team create container</Text>
            </Content>
    );
}

// get google api setup
// 