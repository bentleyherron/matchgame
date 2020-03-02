import React, { Component } from 'react';
import { View }  from 'react-native';
import { Container, Header, Col, Row, Grid, Button, Text, H1, H2, H3, Thumbnail } from 'native-base';

export default class EventContainer extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Grid style={{alignItems: 'center', padding: 10}}>
          <Row><H1>Flag Football in the Park</H1></Row>
          <Row>
            <Col>
                {/* <Row><H3>Piedmont Park</H3></Row>
                <Row><H3>March 15 | 3:30pm</H3></Row> */}
                <Text>Piedmont Park</Text>
                <Text>March 15 | 3:30pm </Text>
            </Col>
            <Col>
                <H3>50 WP</H3>
            </Col>
          </Row>

          <Row>
            <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                <Thumbnail large source={require("../Profile/MightyDucks.png")}/>
            </Col>
            <Col style={{alignItems: 'center', justifyContent: 'center'}}><Text>VS</Text></Col>
            <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                <Thumbnail large source={require("../Profile/MightyDucks.png")}/>
            </Col>
          </Row>
          <Row>
              <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </Text>
            </Row>
          <Row>
              <Col>
                <Button rounded style={{alignItems: 'center', justifyContent: 'center'}}><Text>Map Event</Text></Button>
              </Col>
              <Col>
                <Button rounded style={{alignItems: 'center', justifyContent: 'center'}}><Text>Cancel</Text></Button> 
              </Col>
              </Row>
        </Grid>
      </Container>
    );
  }
}