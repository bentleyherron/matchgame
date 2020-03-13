import React, {useState, useEffect, useContext} from 'react';
import {Text, Content, Container, Picker, Form, Item, Icon, Button, Footer, FooterTab, Spinner, Toast} from 'native-base';
import axios from 'axios';
import { URL } from 'react-native-dotenv';
import uuid from 'react-uuid';
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
                Toast.show({
                    text: "Something went wrong, redirecting to login",
                    buttonText: "Okay"
                })
                setTimeout(() => {
                    navigation.navigate('User Login')
                }, 5000)
            }
        }
        fetchStateData();
    }, []);

    useEffect(() => {
        if (state) {
            setIsLoading(true);
            axios.get(`${URL}/states/${state}`)
                .then(
                r => {
                    setCityList(r.data);
                    setIsLoading(false);
                }
                ).catch(() => {
                    Toast.show({
                        text: "Something went wrong, redirecting to login",
                        buttonText: "Okay"
                    })
                    setTimeout(() => {
                        navigation.navigate('User Login')
                    }, 5000)
                })
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
                                    <Picker.Item label={state.state_name} value={state.id} key={uuid()} />
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
                                <Picker.Item label={city.city} value={city} key={uuid()} />
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
                    <Text style={{fontSize: 15}}>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={() => {navigation.navigate('Profile Pic')}}
                    >
                    <Text style={{fontSize: 15}}>NEXT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
);
}