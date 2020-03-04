import React, { useState } from 'react';
import { Container, Content, Form, Item, Input, Body, Left, Right, Radio, Button, Text, DatePicker, Picker, Icon, Header, Label, Textarea} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ChallengeCreateContainer({ route, navigation}) {

    const [location, setLocation] = useState('');
    const [datetime, setDatetime] = useState('');
    const [wager, setWager] = useState(0);
    const [sport, setSport] = useState('');
    const [description, setDescription] = useState('');
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = dateTime => {
      console.warn("A date has been picked: ", dateTime);
      hideDatePicker();
      setDatetime(dateTime);
    };

    const sportsList = ['Football', 'Flag Football', 'Soccer', 'Volleyball', 'Kuub', 'Darts', 'Ultimate Frisbee', 'Wiffle Ball', 'Softball', 'Baseball', 'Bowling', 'Kickball', 'Bowling', 'Ping Pong', 'Beer Pong', 'Cornhole', 'Bocci', 'Shooting', 'Shuffleboard', 'Tennis', 'Quidditch' ]
    return(
        <Container>
            <Header />
        <Content padder>
          <Form>
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
                <Picker.Item label="Football" value="Football" />
                <Picker.Item label="Flag Football" value="Flag Football" />
                <Picker.Item label='Soccer' value='Soccer' />
                <Picker.Item label='Volleyball' value='Volleyball' />
                <Picker.Item label='Kuub' value='Kuub' />
                <Picker.Item label='Darts' value='Darts'/>
                <Picker.Item label='Ultimate Frisbee' value='Ultimate Frisbee' />
                <Picker.Item label='Wiffle Ball' value='Wiffle Ball' />
                <Picker.Item label='Softball' value='Softball' />
                <Picker.Item label='Baseball' value='Baseball' />
                <Picker.Item label='Bowling' value='Bowling' />
                <Picker.Item label='Kickball' value='Kickball' />
                <Picker.Item label='Bowling' value='Bowling' />
                <Picker.Item label='Ping Pong' value='Ping Pong' />
                <Picker.Item label='Beer Pong' value='Beer Pong' />
                <Picker.Item label='Cornhole' value='Cornhole' />
                <Picker.Item label='Bocci' value='Bocci' />
                <Picker.Item label='Shooting' value='Shooting' />
                <Picker.Item label='Shuffleboard' value='Shuffleboard' />
                <Picker.Item label='Tennis' value='Tennis' />
                <Picker.Item label='Quidditch' value='Quidditch' />
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
                onChangeText={text => setDescription(text)}
              />
            </Item>
          </Form>
        </Content>

        <Text>{sport}</Text>
        <Text>{location}</Text>
        <Text>Time: {datetime.toString()}</Text>
        <Text>{wager}</Text>
        <Text>{description}</Text>

        <Button
              rounded
              // onPress={onNextClick}
              style={{margin: 20}}>
                <Text>Create Challenge</Text>
              </Button>
      </Container>
    );

}