import React from 'react';
import { Content } from 'native-base'; 
import Challenge from './Challenge';

export default function ChallengesContainer() {
    const challenge1 = {
        teamFrom: 'Shark',
        teamTo: 'Dolphin',
        date: new Date("2018-3-20"),
        message: 'We are going to school you guys!',
        wager: 100,
        isAccepted: false
    };

    const challenge2 = {
        teamFrom: 'Team Rocket',
        teamTo: 'Psyduck',
        date: new Date("2004-2-14"),
        message: 'Blasting off at the speed of light!',
        wager: 100,
        isAccepted: false
    }

    const challenge3 = {
        teamFrom: 'Your Mom',
        teamTo: 'Chad',
        date: new Date(),
        message: 'This is getting interesting!',
        wager: 100,
        isAccepted: false
    }

    const challengeList = [challenge1, challenge2, challenge3];
    const challengeCards = challengeList.map(item => <Challenge challenge={item} />)
    return (
        <Content>
            {challengeCards}
        </Content>
    );
}
