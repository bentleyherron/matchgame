import React from 'react';
import { Container, Content, Card, CardItem, Left, Right, Grid, Row, Thumbnail, Body, Text, H1, Accordion } from 'native-base';

const dataArray = [
    { title: "Individual", content: "Games" },
    { title: "Weekend Warriors", content: "Games" },
    { title: "Mighty Ducks", content: "Games" }
  ];

export default function ProfilePage(){
    return (
        <Container padder>
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
                <H1>Sports</H1>
                    <Grid>
                        <Row>
                            <Thumbnail source={require("./soccer.png")} />
                            <Thumbnail source={require("./soccer.png")} />
                            <Thumbnail source={require("./soccer.png")} />
                        </Row>
                    </Grid>
                    
                <H1>Teams</H1>
                    <Card>
                        <CardItem bordered>
                        <Left>
                            <Body>
                            <Text>Weekend Warriors</Text>
                            <Text note>Team Point Total: 800</Text>
                            <Text note>Region: Marietta</Text>
                            </Body>
                        </Left>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem bordered>
                        <Left>
                            <Body>
                            <Text>Mighty Ducks</Text>
                            <Text note>Team Point Total: 800</Text>
                            <Text note>Region: Marietta</Text>
                            </Body>
                        </Left>
                        </CardItem>
                    </Card>
                <H1>Record</H1>
                <Content padder>
                    <Accordion dataArray={dataArray} expanded={0}/>
                </Content>
            </Content>
        </Container>
    );
}