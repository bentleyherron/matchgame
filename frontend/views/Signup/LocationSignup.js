import React, {useState, useEffect} from 'react';
import {Text, Content, Container, Picker, Form, Item, Icon, Button, Footer, FooterTab} from 'native-base';
import axios from 'axios';
import { URL } from 'react-native-dotenv';

export default function LocationSignup({ locationId, setLocationId, navigation }) {
    const [state, setState] = useState(1);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        async function fetchStateData() {
            const url = `${URL}/states/`;
            const results = await axios.get(url);
            setStateList(results.data);
        }
        fetchStateData();
    }, []);

    useEffect(() => {
        async function fetchCityData() {
            const url = `${URL}/states/${state}`;
            const results = await axios.get(url);
            setCityList(results.data);
        }
        if (state) {
            fetchCityData();
        };
    }, [state]);

    return (
        <Container>
            <Content>
                <Form>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="State"
                            selectedValue={state}
                            onValueChange={setState}>
                                {stateList.length ? stateList.map((state, index) => (
                                    <Picker.Item label={state.state_name} value={state.id} key={index + 'state'} />
                                )) : null}
                        </Picker>
                    </Item>
                    {state ? 
                    <Item picker>
                        <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="City"
                        selectedValue={locationId}
                        onValueChange={setLocationId}
                        >
                            {cityList.map((city, i) => (
                                <Picker.Item label={city.city} value={city} key={i + 'city'} />
                            ))}
                        </Picker>
                    </Item>
                    :
                    null}
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                    onPress={() => {navigation.goBack()}}
                    >
                    <Text>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={() => {navigation.navigate('Profile Pic')}}
                    >
                    <Text>NEXT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
);
}