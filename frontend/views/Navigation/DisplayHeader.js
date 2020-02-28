import React from 'react';
import { Header, Left, Body, Right, Title } from 'native-base';

export default function DisplayHeader({currentPage}) {
    return (
        <Header>
            <Left />
            <Body>
                <Title>{currentPage}</Title>
            </Body>
            <Right />
      </Header>
    );
}