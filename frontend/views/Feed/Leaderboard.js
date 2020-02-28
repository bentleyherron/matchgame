import React, {useState} from 'react';
import { List, ListItem, Text, Content, Picker } from 'native-base';

export default function Leaderboard() {
    const [sport, setSport] = useState('tennis');
    const sportsList = ['Football', 'Flag Football', 'Soccer', 'Volleyball', 'Kuub', 'Darts', 'Ultimate Frisbee', 'Wiffle Ball', 'Softball', 'Baseball', 'Bowling', 'Kickball', 'Bowling', 'Ping Pong', 'Beer Pong', 'Cornhole', 'Bocci', 'Shooting', 'Shuffleboard', 'Tennis', 'Quidditch' ];
    const data = {
        tennis: [{team: 'dasher', score: 4100}, {team: 'dancer', score:2000}, {team: 'rudolph', score:5800}],
        football: [{team: 'prancer', score: 3100}, {team: 'vixen', score:2200}, {team: 'comet', score:3900}],
        kuub: [{team: 'cupid', score: 400}, {team: 'donner', score:1800}, {team: 'blitzen', score:5000}]
    }
    return (
        <Content>
            <Picker
            note
            mode="dropdown"
            selectedValue={sport}
            onValueChange={(value) => setSport(value)}
            >
                <Picker.Item label="Tennis" value="tennis" />
                <Picker.Item label="Football" value="football" />
                <Picker.Item label="Kuub" value="kuub" />
            </Picker>
            <List>
                {data[sport] ?
                data[sport].sort((a, b) => (a.score > b.score) ? -1 : 1)
                        .map((item, index) => (
                                <ListItem key={index}>
                                    <Text>Name: {item.team}</Text>
                                    <Text>Score: {item.score}</Text>
                                </ListItem>)
                                ) : null}
            </List>
        </Content>
    );
}