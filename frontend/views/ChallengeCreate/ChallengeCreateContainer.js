import React, { useState, useEffect, useContext } from 'react';
import { Container, Content, Form, Item, Input, Body, Left, Right, Radio, Button, Text, DatePicker, Picker, Icon, Header, Label, Textarea} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonCreateChallenge from './ButtonCreateChallenge';
import {URL} from 'react-native-dotenv';

import UserContext from '../../UserContext';
import axios from 'axios';

export default function ChallengeCreateContainer({ route, navigation }) {

    const { userData } = useContext(UserContext).state;

    const teamIdArray = userData.teams;

    const [team, setTeam] = useState('');
    const [location, setLocation] = useState('');
    const [datetime, setDatetime] = useState('');
    const [wager, setWager] = useState(0);
    const [sport, setSport] = useState(1);
    const [message, setMessage] = useState('');

    const [teamNames, setTeamNames] = useState('');
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const getTeamName = (team_id) => {
      return axios.get(`${URL}/teams/${team_id}`)
    }

    useEffect(() => {
      axios.all(teamIdArray.map((team) => {
        return getTeamName(team.team_id);
      }))
      .then(responseArr => {
        setTeamNames(responseArr);
      })
  },[])

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = dateTime => {
      hideDatePicker();
      setDatetime(dateTime.toISOString());
    };

    const sportsList = ['Football', 'Flag Football', 'Soccer', 'Volleyball', 'Kuub', 'Darts', 'Ultimate Frisbee', 'Wiffle Ball', 'Softball', 'Baseball', 'Bowling', 'Kickball', 'Bowling', 'Ping Pong', 'Beer Pong', 'Cornhole', 'Bocci', 'Shooting', 'Shuffleboard', 'Tennis', 'Quidditch' ]
    return(
        <Container>
            <Header />
        <Content padder>
          <Form>
            <Item fixedLabel>
              <Label>Select Your Team</Label>
              <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select Sport"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={team}
                    onValueChange={team => setTeam(team)}
              >
                {teamNames ? (
                  teamNames.map(team => {
                    return (
                      <Picker.Item label={team.data.name} value={team.data.id} />
                    );
                  })
                ) : null}
              </Picker>
            </Item>
            <Item fixedLabel >
                <Label>Sport</Label>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select Sport"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={sport}
                    onValueChange={sport => setSport(sport)}
              >
                <Picker.Item label="Football" value="1" />
                <Picker.Item label="Flag Football" value="2" />
                <Picker.Item label='Soccer' value='3' />
                <Picker.Item label='Volleyball' value='4' />
                <Picker.Item label='Kuub' value='5' />
                <Picker.Item label='Darts' value='6'/>
                <Picker.Item label='Ultimate Frisbee' value='7' />
                <Picker.Item label='Wiffle Ball' value='8' />
                <Picker.Item label='Softball' value='9' />
                <Picker.Item label='Baseball' value='10' />
                <Picker.Item label='Bowling' value='11' />
                <Picker.Item label='Kickball' value='12' />
                <Picker.Item label='Bowling' value='13' />
                <Picker.Item label='Ping Pong' value='14' />
                <Picker.Item label='Beer Pong' value='15' />
                <Picker.Item label='Cornhole' value='16' />
                <Picker.Item label='Bocci' value='17' />
                <Picker.Item label='Shooting' value='18' />
                <Picker.Item label='Shuffleboard' value='19' />
                <Picker.Item label='Tennis' value='20' />
                <Picker.Item label='Quidditch' value='21' />
              </Picker>
            </Item>
            <Item fixedLabel>
              <Label>Location</Label>
              <Input
                placeholder='(ex. Piedmont Park)'
                name="location"
                onChangeText={text => setLocation(text)}/>
            </Item>
            <Item fixedLabel>
                <Label>Date and Time</Label>
                <Button
                  transparent
                  onPress={showDatePicker}>
                    <Text>Select</Text>
                  </Button>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
              />
               
            </Item>
            <Item fixedLabel>
              <Label>How many points do you wager?</Label>
              <Right>
                <Input
                  placeholder="0"
                  keyboardType={'numeric'}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onChangeText={text => setWager(text)}
                  ></Input>
              </Right>
            </Item>
            <Item stackedLabel>
              <Label>Additional Information</Label>
              <Input placeholder="Specific game rules, etc." 
                onChangeText={text => setMessage(text)}
              />
            </Item>
          </Form>
        </Content>
        
        <Text>{team}</Text>
        <Text>{sport}</Text>
        <Text>{location}</Text>
        <Text>Time: {datetime}</Text>
        <Text>{wager}</Text>
        <Text>{message}</Text>

        <ButtonCreateChallenge 
          team_from_id={team}
          location={location}
          datetime={datetime}
          wager={wager}
          sport_id={sport}
          message={message}
        />

      </Container>
    );

}