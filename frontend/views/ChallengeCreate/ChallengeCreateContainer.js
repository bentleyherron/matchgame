import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Form, Item, Input, Body, Left, Right, Radio, Button, Text, DatePicker, Picker, Icon, Header, Label, Textarea, Card, H3,  CardItem, Toast} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {URL, GOOGLE_API_KEY} from 'react-native-dotenv';
import uuid from 'react-uuid';

import UserContext from '../../UserContext';
import axios from 'axios';

// add error handling on this (if no location selected, etc.)
export default function ChallengeCreateContainer({ navigation }) {

    const { userData, sportData, userToken } = useContext(UserContext).state;
    const userCityId = userData.userInfo.city_id;

    const {teams} = userData;

    const [team, setTeam] = useState(teams[1]);
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [datetime, setDatetime] = useState('');
    const [wager, setWager] = useState(0);
    const [isGoodWager, setIsGoodWager] = useState(false);
    const [sport, setSport] = useState(teams[1].sport_id);
    const [message, setMessage] = useState('');
    const [googleData, setGoogleData] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const checkWager = () => {
      if (wager < 1) {
        Toast.show({
          text: "Wagers must be greater than zero",
          buttonText: "Okay",
          position: "top"
        })
      } else {
        setIsGoodWager(true);
      }
    }

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
        setLocation(name);
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

    const clearChallengeCreate = () => {
      setTeam(teams[1]);
      setLocation('');
      setLatitude(null);
      setLongitude(null);
      setDatetime('');
      setWager(0);
      setIsGoodWager(false);
      setSport(teams[1].sport_id);
      setMessage('');
      setGoogleData(null);
      setDatePickerVisibility(false);
    }

    const postChallenge = async () => {
      if(sport && datetime && location && wager) {
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
          axios.post(url, challengeObject, {
            headers: {
              "x-access-token": userToken
            }
          }).then(() => {
            clearChallengeCreate();
            navigation.navigate('Feed', {hasSignedUp:true});
          }).catch(() => {
            Toast.show({
              text: "Unable to submit",
              buttonText: "Okay"
          })
          setTimeout(() => {
              navigation.navigate('Feed')
          }, 3000)
          })
      } else if (!isGoodWager) {
        Toast.show({
          text: "Must have a wager greater than zero to post challenge",
          buttonText: "Okay",
          position: "top"
        })
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
                      <Picker.Item key={uuid()} label={team.name} value={team} />
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
                value={location}
                onChangeText={text => setLocation(text)}
                onSubmitEditing={async () => getGoogleLocation(location)}
                onBlur={async () => getGoogleLocation(location)}
                />
            </Item>
            {googleData ? 
            <Item style={{flexDirection:"column", height:"auto"}}>
              <H3 style={{paddingTop:10}}>Did you mean?</H3>
              {googleData.map((obj, i) => (
                <Card key={uuid()} style={{height:120, minWidth: 350}} onPress={() => selectGoogleCard(obj)}>
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
            <Item fixedLabel success={isGoodWager}>
              <Label>How many points do you wager?</Label>
              <Right>
                <Input
                  placeholder="0"
                  keyboardType={'numeric'}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onChangeText={text => setWager(text)}
                  onBlur={() => checkWager()}
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