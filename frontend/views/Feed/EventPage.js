import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Col, Row, Grid, Button, Text, H1, H2, H3, Thumbnail, Body, Label, Card, CardItem, Item, Left, Right } from 'native-base';

export default function EventPage({pageContent, eventClick}) {

    const {
        city_state,
        date,
        description,
        sport_id,
        photo,
        wager,
        title
    } = pageContent.event;

    const {eventTeams} = pageContent;

    const month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec'];
    const datetime = new Date(date);
    const formattedDate = `${month[datetime.getMonth()]} ${datetime.getDate()}`;

    function addZero(i) {
        if (i < 10) {
        i = "0" + i;
        }
        return i;
    }
    
    function formatTime(d) {
        let hours = addZero(d.getHours());
        let minutes = addZero(d.getMinutes());
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedTime = hours + ':' + minutes + ' ' + ampm;
        return formattedTime;
    }

    const formattedTime = formatTime(datetime);

    const styles = StyleSheet.create({
      container: {
          paddingLeft: 15,
          paddingRight: 15,
          backgroundColor: '#fafafa'
      },
      profileHeaderContainer : {
          marginBottom: 15,
          borderRadius: 15,
      },
      profileHeader: {
          marginBottom: 5,
          borderRadius: 15,
          backgroundColor: '#fafafa',
      },
      eventCategories : {
          padding: 15,
          fontWeight: "bold"
      },
      eventBody: {
          borderRadius: 15,
          padding: 15
      },
      profileBodyText: {
          justifyContent: 'center'
      }
  });

  console.log()

    return (
      <Container style={styles.container}>
        <Header>
            <Button rounded onPress={() => eventClick()}><Text>Back</Text></Button>
        </Header>
        <Content padder>
          <Card style={styles.eventBody}>
            <CardItem header bordered>
              <Body>
                <Text>{title}</Text>
                <Text note>{formattedDate} · {formattedTime}</Text>
                <Text note>{city_state}</Text>
              </Body>
              <Right><Thumbnail source={{uri: photo}}></Thumbnail></Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Points Wagered:</Text>
              </Body>
              <Right><H2>{wager}</H2></Right>
            </CardItem>
            <CardItem header>
              <Text>Teams</Text>
            </CardItem>
            <CardItem bordered> 
              <Left>
                <Body>
                  <Thumbnail source={{uri: eventTeams[0].eventTeam.photo}}></Thumbnail>
                  <Text>{eventTeams[0].eventTeam.team_name}</Text>
                </Body>
              </Left>
              <Right>
                <Body>
                  <Thumbnail source={{uri: eventTeams[1].eventTeam.photo}}></Thumbnail>
                  <Text>{eventTeams[1].eventTeam.team_name}</Text>
                </Body>
                </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Event Details</Text>
                <Text note>
                  {description}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Button rounded><Text>Map Location</Text></Button>
          <Button rounded><Text>Cancel</Text></Button>
        </Content>
      </Container>
    );
}