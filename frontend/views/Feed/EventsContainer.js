import React from 'react';
import { Content, Text } from 'native-base';
import Event from './Event';

export default function EventsContainer() {
    return (
        <Content>
            <Text>This is the Events Container!</Text>
            <Event />
        </Content>
    );
}