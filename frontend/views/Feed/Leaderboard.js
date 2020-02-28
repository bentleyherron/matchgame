import React, {useState} from 'react';
import { Content, Text } from 'native-base';

export default function Leaderboard() {
    const [sport, setSport] = useState(null);
    
    return (
        <Content>
            <Text>This is the leaderboard!</Text>
        </Content>
    );
}