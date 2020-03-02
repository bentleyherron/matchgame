import React from 'react';
import {View}  from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Grid, Row, Thumbnail, Body, Text, H1, Accordion } from 'native-base';


const dataArray = [
    { title: "Individual", content: "Games" },
    { title: "Weekend Warriors", content: "Games" },
    { title: "Mighty Ducks", content: "Games" }
  ];

export default function ProfilePage(){
    return (
        <Container>
            <Content padder>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail large source={require("./trailrunner.jpg")} />
                            <Body>
                            <Text>Tom Sports</Text>
                            <Text note>The Ringer</Text>
                            <Text note>Point Total: 250</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>

                
                <Card>
                    <H1 style={{padding: 20}}>Sports</H1>
                    <CardItem bordered>
                        <Grid>
                            <Row>
                                <Thumbnail source={require("./soccer.png")} />
                                <Thumbnail source={require("./soccer.png")} />
                                <Thumbnail source={require("./soccer.png")} />
                            </Row>
                        </Grid>
                    </CardItem>
                    <H1 style={{padding: 20}}>Teams</H1>
                    <CardItem>
                        
                        <Left>
                            <Body>
                            <Text>Weekend Warriors</Text>
                            <Text note>Team Point Total: 800</Text>
                            <Text note>Region: Marietta</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Body>
                            <Text>Mighty Ducks</Text>
                            <Text note>Team Point Total: 800</Text>
                            <Text note>Region: Marietta</Text>
                            </Body>
                        </Left>
                    </CardItem>

                <H1 style={{padding: 20}}>Record</H1>
                <CardItem>
                    <Accordion dataArray={dataArray} expanded={0}/>
                </CardItem>
            </Card>
            </Content>
        </Container>
    );
}