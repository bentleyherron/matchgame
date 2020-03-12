import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Col, Row, Grid, Button, Text, H1, H2, H3, Thumbnail, Body, Label, Card, CardItem, Item, Left, Right, Icon } from 'native-base';

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
      returnButton: {
        margin: 10,
        justifyContent: 'center'
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
      eventCategoryContainer : {
        paddingBottom: 15
      },
      eventCategoryTitle : {
          fontWeight: "bold"
      },
      eventBody: {
          borderRadius: 15,
          padding: 15
      },
      profileBodyText: {
          justifyContent: 'center'
      },
      eventButtonsRow: {
        justifyContent: 'space-around',
        margin: 10
      },
      eventButton: {
        backgroundColor: '#02A456'
      },
      eventTeamText: {
        alignItems: 'center',
        justifyContent: 'center'
      }
  });

  console.log()

    return (
      <Container style={styles.container}>
        
        <Content padder showsVerticalScrollIndicator={false}>
          <Button bordered rounded style={styles.returnButton} onPress={() => eventClick()}><Text>Return to Event Feed</Text></Button>
          <Card style={styles.eventBody}>
            <CardItem header bordered style={styles.eventCategoryContainer}>
              <Body>
                <Text style={styles.eventCategoryTitle}>{title}</Text>
                <Text note>{formattedDate} · {formattedTime}</Text>
                <Text note>{city_state}</Text>
              </Body>
              <Right><Thumbnail small source={{uri: photo}}></Thumbnail></Right>
            </CardItem>
            <CardItem bordered style={styles.eventCategoryContainer}>
              <Body>
                <Text style={styles.eventCategoryTitle}>Points Wagered:</Text>
              </Body>
              <Right><Text>{wager}</Text></Right>
            </CardItem>
            <CardItem>
              <Text style={styles.eventCategoryTitle}>Teams</Text>
            </CardItem>
            <CardItem> 
              <Left style={styles.eventTeamText}>
                <Body style={styles.eventTeamText}>
                  {eventTeams[0].eventTeam.photo ? (
                    <Thumbnail source={{uri: eventTeams[0].eventTeam.photo}}></Thumbnail>) : <Thumbnail source={require("../Profile/soccer.png")}></Thumbnail> }
                    <Text>{eventTeams[0].eventTeam.team_name}</Text>
                </Body>
              </Left>
              <Right style={styles.eventTeamText}>
                <Body>
                  {eventTeams[1].eventTeam.photo ? (
                      <Thumbnail source={{uri: eventTeams[1].eventTeam.photo}}></Thumbnail>
                  ) : <Thumbnail source={require("../Profile/soccer.png")}></Thumbnail>}
                    <Text>{eventTeams[1].eventTeam.team_name}</Text>
                </Body>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.eventCategoryTitle}>Event Details</Text>
                <Text note>
                  {description}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Grid>
            <Row style={styles.eventButtonsRow}>
              <Button rounded style={styles.eventButton}><Text>Map Location</Text></Button>
              <Button rounded style={styles.eventButton}><Text>Cancel</Text></Button>
            </Row>
          </Grid>
          
        </Content>
      </Container>
    );
}