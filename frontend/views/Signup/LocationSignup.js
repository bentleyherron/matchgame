import React, {useState, useEffect, useContext} from 'react';
import {Text, Content, Container, Picker, Form, Item, Icon, Button, Footer, FooterTab, Spinner} from 'native-base';
import axios from 'axios';
import { URL } from 'react-native-dotenv';
import SignupContext from './SignupContext';

export default function LocationSignup({ navigation }) {
    const context = useContext(SignupContext);
    const { locationId } = context.state;
    const { setLocationId } = context.actions;
    const [state, setState] = useState(1);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStateData() {
            try{
                const url = `${URL}/states`;
                const results = await axios.get(url);
                setStateList(results.data);
                setIsLoading(false);
            } catch(err) {
                console.log(err);
            }
        }
        fetchStateData();
    }, []);

    useEffect(() => {
        async function fetchCityData() {
            try{
                setIsLoading(true)
                const url = `${URL}/states/${state}`;
                const results = await axios.get(url);
                setCityList(results.data);
                setIsLoading(false);
            } catch(err) {
                console.log(err);
            }
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
                {isLoading ? <Spinner /> : null}
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