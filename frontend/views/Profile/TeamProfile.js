import React, { useState } from 'react';
// import {View, Text} from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Grid, Row, Col, Thumbnail, Body, Text, Button, H1, Accordion } from 'native-base';

import { YellowBox } from 'react-native'


const dataArray = [
    { title: "All Sports", content: "Games" },
    { title: "Ice Hockey", content: "Games" },
    { title: "Ultimate Frisbee", content: "Games" }
  ];

export default function TeamProfile(){

    const [isCaptain, setCaptain] = useState(false);

    const captainAdd = <Col>
    <Button rounded>
        <Text>Add Team Member</Text>
    </Button>
</Col>;

    return (
        <Container padder>
            <Content padder>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail large source={require("./MightyDucks.png")} />
                            <Body>
                            <Text>Mighty Ducks</Text>
                            <Text note>Members: 10</Text>
                            <Text note>Point Total: 1200</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                <Card>
                    <H1 style={{padding: 20}}>Sports</H1>
                    <CardItem>
                        <Grid>
                            <Row>
                                <Thumbnail source={require("./soccer.png")} />
                                <Thumbnail source={require("./soccer.png")} />
                                <Thumbnail source={require("./soccer.png")} />
                            </Row>
                        </Grid>
                    </CardItem>
                    <H1 style={{padding: 20}}>Record</H1>
                    <CardItem>
                        <Accordion dataArray={dataArray} expanded={0}/>
                    </CardItem>
                    <Grid>
                        <Col>
                            <H1 style={{padding: 20}}>Roster</H1>
                        </Col>
                        {isCaptain ? captainAdd : null}
                    </Grid>
                    <CardItem bordered> 
                        <Left>
                            <Thumbnail large source={require("./trailrunner.jpg")} />
                            <Body>
                            <Text>Tom Sports</Text>
                            <Text note>The Ringer</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail large source={require("./trailrunner.jpg")} />
                            <Body>
                            <Text>Tom Sports</Text>
                            <Text note>The Ringer</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail large source={require("./trailrunner.jpg")} />
                            <Body>
                            <Text>Tom Sports</Text>
                            <Text note>The Ringer</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail large source={require("./trailrunner.jpg")} />
                            <Body>
                            <Text>Tom Sports</Text>
                            <Text note>The Ringer</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}