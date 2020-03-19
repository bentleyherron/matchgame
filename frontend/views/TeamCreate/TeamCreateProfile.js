import React, {useState, useEffect, useContext} from 'react';
import {Container, Content, Form, Item, Input, Picker, Spinner, Text, Button, Icon, Footer, FooterTab, Body, Left, Right, Thumbnail} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import uuid from 'react-uuid';
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
    }, [teamPhoto])
    
    const styles = StyleSheet.create({
    pickPhotoButton: {
        justifyContent: 'center',
        backgroundColor: '#02A456'
    },
    teamPhoto: {
        marginRight: 15
    }
    });

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
                        selectedValue={teamSport || 1}
                        onValueChange={setTeamSport}>
                            {sportData.length ? sportData.map((obj, index) => (
                                <Picker.Item label={obj.name} value={obj.id} key={uuid()} />
                            )) : null}
                    </Picker>
                </Item>
                <Item style={{paddingTop: 10, paddingBottom: 10}}>
                    <Body>
                        <Left>
                            <Button rounded style={styles.pickPhotoButton} onPress={() => {imagePickerAsync();setShowSpinner(true)}} >
                                <Text>Pick a team photo</Text>
                            </Button>
                        </Left>
                        <Right>
                            {showSpinner && teamPhoto ? <Spinner /> : null}
                        </Right>
                    </Body>
                    <Right>
                        {teamPhoto ? <Thumbnail large style={styles.teamPhoto} source={{uri: teamPhoto}} /> : null}
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
              <Text style={{fontSize: 15}}>NEXT</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
}