import React from 'react';
// import {View, Text} from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Grid, Row, Thumbnail, Body, Text, H1, Accordion } from 'native-base';

const dataArray = [
    { title: "All Sports", content: "Games" },
    { title: "Ice Hockey", content: "Games" },
    { title: "Ultimate Frisbee", content: "Games" }
  ];

export default function TeamProfile(){
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
                <H1>Sports</H1>
                    <Grid>
                        <Row>
                            <Thumbnail source={require("./soccer.png")} />
                            <Thumbnail source={require("./soccer.png")} />
                            <Thumbnail source={require("./soccer.png")} />
                        </Row>
                    </Grid>
                <H1>Record</H1>
                <Content padder>
                    <Accordion dataArray={dataArray} expanded={0}/>
                </Content>
                <H1>Roster</H1>
                <Card>
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