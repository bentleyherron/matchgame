import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Text } from 'native-base';
import Tab1 from './Received';
import Tab2 from './Sent';

export default function Inbox() {
    
    return (
      <Container>
        <Header hasTabs/>
        <Tabs>
          <Tab heading={ <TabHeading><Text>Received Challenges</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Text>Sent Challenges</Text></TabHeading>}>
            <Tab2 />
          </Tab>
        </Tabs>
      </Container>
    );
}