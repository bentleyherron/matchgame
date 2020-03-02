import React, { Component } from 'react';
import { Container, Header, Content, Col, Row, Grid, Button, Text, H1, H2, H3, Thumbnail, Body, Card, CardItem, Item, Left, Right } from 'native-base';

export default class EventContainer extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Body>
                <Text>Piedmont Park Soccer</Text>
                <Text note>March 15, 3:30pm</Text>
              </Body>
              <Right><Thumbnail source={require("../Profile/soccer.png")}></Thumbnail></Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Points Wagered:</Text>
              </Body>
              <Right><H2>100</H2></Right>
            </CardItem>
            <CardItem header>
              <Text>Teams</Text>
            </CardItem>
            <CardItem bordered> 
              <Left><Thumbnail large source={require("../Profile/MightyDucks.png")}></Thumbnail></Left>
              <Right><Thumbnail large source={require("../Profile/MightyDucks.png")}></Thumbnail></Right>
            </CardItem>
            <CardItem>
              <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </Text>
            </CardItem>
          </Card>
          <Button rounded><Text>Cancel</Text></Button>
        </Content>
      </Container>
    );
  }
}