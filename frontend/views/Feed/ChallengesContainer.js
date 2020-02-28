import React from 'react';
import { Content, Text } from 'native-base'; 
import Challenge from './Challenge';

export default function ChallengesContainer() {
    return (
        <Content>
            <Text>This is the Challenges Container!</Text>
            <Challenge />
        </Content>
    );
}
