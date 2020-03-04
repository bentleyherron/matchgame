import React, { Component, useState, useEffect } from 'react';
import { Container, Header, Content, Col, Row, Grid, Button, Text, H1, H2, H3, Thumbnail, Body, Card, CardItem, Item, Left, Right, Spinner } from 'native-base';
import { Linking } from 'expo';
import axios from 'axios'

import EventPage from './EventPage'

export default function EventContainer() {

  const [eventData, setEventData] = useState(null);
  const [sportName, setSportName] = useState(null);

  useEffect(() => {
    const EventUrl = `https://e0dbe29f.ngrok.io/events/1`;
    axios.get(EventUrl)
      .then((response) => {
        setEventData(response.data)
        return response.data
      })
      .then((r) => {
        console.log(r.sport_id);
        axios.get(`https://e0dbe29f.ngrok.io/sports/${r.sport_id}`)
          .then((response) => {
            console.log(response.data[0].name);
            setSportName(response.data[0].name);
          })

      })
  }, [])



  const handleMapClick = () => {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=dave+busters+marietta');
  }

    return (
      <Container>
        <Header />
        {eventData && sportName ? (
          <EventPage
            eventData={eventData}
            sportName={sportName}
            handleMapClick={handleMapClick} />
        ) : (
          <Spinner />
        )}
        
      </Container>
    );
}