import React, {useState, useEffect, useContext} from 'react';
import {Container, Content, Form, Item, Input, Picker, Spinner, Text, Button, Icon, Footer, FooterTab, Left, Right} from 'native-base';
import {Image} from 'react-native';
import TeamContext from './TeamContext';
import UserContext from '../../UserContext';

export default function TeamCreateProfile({navigation}) {
    const {sportData} = useContext(UserContext).state;
    const {state, actions} = useContext(TeamContext);
    const {teamName, teamSport, teamPhoto} = state;
    const {setTeamName, setTeamSport, imagePickerAsync} = actions;
    const [showSpinner, setShowSpinner] = useState(false);
    useEffect(() => {
        if(teamPhoto) {
            setShowSpinner(false);
        }
    })

    return(
        <Container>
        <Content>
            <Form>
                <Item fixedLabel>
                <Input 
                    placeholder='Team Name'
                    name="Team Name"
                    onChangeText={text => setTeamName(text)}
                    />
                </Item>
                <Item picker style={{paddingLeft: 15}}>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Sport"
                        selectedValue={teamSport}
                        onValueChange={setTeamSport}>
                            {sportData.length ? sportData.map((obj, index) => (
                                <Picker.Item label={obj.name} value={obj.id} key={index + 'sport'} />
                            )) : null}
                    </Picker>
                </Item>
                <Item style={{paddingTop: 10, paddingBottom: 10}}>
                    <Left>
                        <Button primary onPress={() => {imagePickerAsync();setShowSpinner(true)}} >
                            <Text>Pick a team photo</Text>
                        </Button>
                    </Left>
                    <Right>
                        {showSpinner && teamPhoto ? <Spinner /> : null}
                        {teamPhoto ? <Image style={{width: 100, height: 100, marginRight: 10}} source={{uri: teamPhoto}} /> : null}
                    </Right>
                </Item>
            </Form>
        </Content>

        <Footer>
          <FooterTab>
            <Button
            onPress={() => {
                navigation.navigate('teamMemberSelect'); 
            }}
            >
              <Text>NEXT</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
}