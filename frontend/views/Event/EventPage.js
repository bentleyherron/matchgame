import React, { Component, useState, useEffect } from 'react';
import { Container, Header, Content, Col, Row, Grid, Button, Text, H1, H2, H3, Thumbnail, Body, Card, CardItem, Item, Left, Right } from 'native-base';

export default function EventPage({ eventData, sportName, handleMapClick}) {

    const { title,
            date,
            is_public,
            description
            } = eventData;

    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthArray = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    const datetime = new Date(date);
    const formattedDate = `${dayArray[datetime.getDay()]}, ${monthArray[datetime.getMonth()]} ${datetime.getDate()}`
    const formattedTime = `${datetime.getHours()}:${datetime.getMinutes()}`
    
    return(
        <Content padder>
          <H1>{title}</H1>
          <Card>
           <CardItem bordered> 
              <Left><Thumbnail large source={require("../Profile/MightyDucks.png")}></Thumbnail></Left>
              <Right><Thumbnail large source={require("../Profile/MightyDucks.png")}></Thumbnail></Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Event Location</Text>
                <Text note>{formattedDate} {formattedTime}</Text>
                <Text note>{is_public ? 'Public' : 'Private'}</Text>
                <Text note>{sportName}</Text>
              </Body>
              <Right><Thumbnail source={require("../Profile/soccer.png")}></Thumbnail></Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Points Wagered</Text>
              </Body>
              <Right><H2>100</H2></Right>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                Additional Information
                </Text>
                <Text note>
                  {description}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card transparent>
              <CardItem>
                <Left>
                    <Button rounded
                    onPress={handleMapClick}><Text>Map Location</Text></Button>
                </Left>
                <Right>
                    <Button rounded><Text>Cancel Event</Text></Button>
                </Right>
              </CardItem>

          </Card>
        </Content>
    );
}