import React, { useState, useEffect, useContext } from 'react';
import { Container, Content, Form, Item, Input, Body, Left, Right, Radio, Button, Text, DatePicker, Picker, Icon, Header, Label, Textarea} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {URL, GOOGLE_API_KEY} from 'react-native-dotenv';

import UserContext from '../../UserContext';
import axios from 'axios';

// add error handling on this (if no location selected, etc.)
export default function ChallengeCreateContainer({ navigation }) {

    const { userData, sportData } = useContext(UserContext).state;
    const userCityId = userData.userInfo.city_id;

    const {teams} = userData;

    const [team, setTeam] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [datetime, setDatetime] = useState('');
    const [wager, setWager] = useState(0);
    const [sport, setSport] = useState(null);
    const [message, setMessage] = useState('');

    const [teamNames, setTeamNames] = useState('');
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = dateTime => {
      hideDatePicker();
      setDatetime(dateTime.toISOString());
    }

    const getGoogleLocation = async (input) => {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${GOOGLE_API_KEY}&input=${input}&inputtype=textquery&fields=formatted_address,geometry,name,place_id,plus_code`);
      if (response.data.candidates.length) {
        const {geometry, name } = response.data.candidates[0];
        setLatitude(geometry.location.lat);
        setLongitude(geometry.location.lng);
        setLocation(name);
      } else {
        console.log('Google Maps Error in Challenge Create Container');
      }
    }

    const formatDate = (str) => {
      const date = new Date(str);
      const formattedDate = date.toLocaleDateString();
      return formattedDate;
    }

    const formatTime = (str) => {
      const date = new Date(str);
      const formattedTime = date.toLocaleTimeString();
      return formattedTime;
    }

    const postChallenge = async () => {
      const challengeObject = {
        challenge: {
            sport_id: sport,
            datetime,
            wager,
            message,
            team_from_id: team.id,
            city_id: userCityId,
            latitude,
            longitude
        }
    }
      const url = `${URL}/challenges`
      const response = await axios.post(url, challengeObject);
      navigation.navigate('Feed', {hasSignedUp:true});
      
  }

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
                    placeholder="Select Team"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={team}
                    onValueChange={team => {setTeam(team); setSport(team.sport_id)}}
              >
                {teams ? (
                  teams.map(team => {
                    return (
                      <Picker.Item label={team.name} value={team} />
                    );
                  })
                ) : null}
              </Picker>
            </Item>
            <Item fixedLabel >
                <Label>Sport</Label>
                {team ? team.sport_id ?  <Text>{team.sport_id}</Text> : <Text>Error, you need to add a sport to your team</Text> : null}
            </Item>
            <Item fixedLabel>
              <Label>Location</Label>
              <Input
                placeholder='(ex. Piedmont Park)'
                name="location"
                onChangeText={text => setLocation(text)}
                onSubmitEditing={async () => getGoogleLocation(location)}
                />
            </Item>
            <Item fixedLabel>
                <Label>Date and Time</Label>
                <Body>
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
                </Body>
                {datetime ?
                <Right style={{flexDirection: 'column'}}>
                   <Text>{formatDate(datetime)}</Text>
                   <Text>{formatTime(datetime)}</Text>
                </Right> : null}
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
        <Button onPress={() => postChallenge()}>
          <Text>Post Challenge</Text>
        </Button>

      </Container>
    );

}