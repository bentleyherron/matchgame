import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Form, Item, Input, Body, Left, Right, Radio, Button, Text, DatePicker, Picker, Icon, Header, Label, Textarea, Card, H3,  CardItem, Toast} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {URL, GOOGLE_API_KEY} from 'react-native-dotenv';

import UserContext from '../../UserContext';
import axios from 'axios';

// add error handling on this (if no location selected, etc.)
export default function ChallengeCreateContainer({ navigation }) {

    const { userData, sportData, userToken } = useContext(UserContext).state;
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
    const [googleData, setGoogleData] = useState(null);

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
      try{
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${GOOGLE_API_KEY}&input=${input}&inputtype=textquery&fields=formatted_address,geometry,name,place_id,plus_code`);
        if (response.data.candidates.length) {
          setGoogleData(response.data.candidates);
          const { geometry } = response.data.candidates[0];
          setLatitude(geometry.location.lat);
          setLongitude(geometry.location.lng);
        } else {
            Toast.show({
                text: "No locations match input",
                buttonText: "Okay"
            })
        }
      } catch(err) {
          Toast.show({
              text: "Unable to access Google, please try again later",
              buttonText: "Okay"
          })
          setTimeout(() => {
              navigation.navigate('Feed')
          }, 5000)
      }
    }

    const selectGoogleCard = (obj) => {
        const {geometry, name } = obj;
        setLatitude(geometry.location.lat);
        setLongitude(geometry.location.lng);
        setGoogleData(null);
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
      if(sport && datetime && location && wager) {
        try{
          const challengeObject = {
            challenge: {
                sport_id: sport,
                datetime,
                wager,
                message,
                team_from_id: team.id,
                city_id: userCityId,
                latitude,
                longitude,
                title: `${sportData[sport - 1].name} at ${location}`
            }
        }
          const url = `${URL}/challenges`
          const response = await axios.post(url, challengeObject, {
            headers: {
              "x-access-token": userToken
            }
          });
          navigation.navigate('Feed', {hasSignedUp:true});
        }catch(err) {
            Toast.show({
                text: "Unable to submit",
                buttonText: "Okay"
            })
            setTimeout(() => {
                navigation.navigate('Feed')
            }, 5000)
        }
      } else {
        Toast.show({
          text: "Must fill out all fields to post challenge",
          buttonText: "Okay",
          position: 'top'
        })
      }
  }
    useEffect(() => {
      if(teams.length === 1) {
        Toast.show({
          text: "You are not a member of any teams. Create or join a team first.",
          buttonText: "Okay",
          position: "top"
        })
        setTimeout(() => {
          navigation.navigate('Profile');
        }, 2000)
      }
    }, [])

  const styles = StyleSheet.create({
    postChallengeButton: {
      margin: 15,
      backgroundColor: '#02A456',
      justifyContent: 'center'
    }
  });



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
                  teams.slice(1).map(team => {
                    return (
                      <Picker.Item key={team.id + "team"} label={team.name} value={team} />
                    );
                  })
                ) : null}
              </Picker>
            </Item>
            <Item style={{paddingVertical:10, paddingRight:10}} fixedLabel >
                <Label>Sport</Label>
                {team ? team.sport_id ?  <Text>{sportData[team.sport_id - 1].name}</Text> : <Text>Error, you need to add a sport to your team</Text> : null}
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
            {googleData ? 
            <Item style={{flexDirection:"column"}}>
              <H3 style={{paddingTop:10}}>Did you mean?</H3>
              {googleData.map((obj, i) => (
                <Card key={i + "Google Card"} style={{height:120, minWidth: 350}} onPress={() => selectGoogleCard(obj)}>
                  <CardItem button onPress={() => selectGoogleCard(obj)}>
                    <Left>
                      <Text>Name</Text>
                    </Left>
                    <Right>
                      <Text>{obj.name}</Text>
                    </Right>
                  </CardItem>
                  <CardItem button onPress={() => selectGoogleCard(obj)}>
                    <Left>
                      <Text>Address</Text>
                    </Left>
                    <Right>
                      <Text>{obj.formatted_address}</Text>
                    </Right>
                  </CardItem>
                </Card>
              ))}
            </Item>
            : null}
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
        <Button rounded style={styles.postChallengeButton} onPress={() => postChallenge()}>
          <Text>POST CHALLENGE</Text>
        </Button>

      </Container>
    );

}