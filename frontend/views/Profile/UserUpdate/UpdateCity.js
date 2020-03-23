import React, {useState, useEffect, useContext} from 'react';
import {Text, Content, Container, Picker, Form, Item, Icon, Button, Footer, FooterTab, Spinner, Toast} from 'native-base';
import axios from 'axios';
import { URL } from 'react-native-dotenv';
import uuid from 'react-uuid';
import UserContext from '../../../UserContext';

export default function UpdateCity({ navigation }) {
    const {userToken, userData} = useContext(UserContext).state;
    const {setShouldRefresh} = useContext(UserContext).actions;
    const {id, city_id}= userData.userInfo;
    const [newCity_Id, setNewCity_Id] = useState(null);
    const [state, setState] = useState(null);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    console.log(city_id);
    useEffect(() => {
        setNewCity_Id(city_id);
            axios.get(`${URL}/states/city/${city_id}`)
                .then(r => {
                    setState(r.data[0].state_id)}
                    )
                .catch(() => {
                    Toast.show({
                        text: "Unable to access the database",
                        buttonText: "Okay"
                    })
                    setTimeout(() => {
                        navigation.navigate('Profile')
                    }, 5000)
                })
    }, [])

    useEffect(() => {
        axios.get(`${URL}/states`)
            .then(r => setStateList(r.data))
            .catch(() => {
                Toast.show({
                    text: "Unable to access the database",
                    buttonText: "Okay"
                })
                setTimeout(() => {
                    navigation.navigate('Profile')
                }, 5000)
            })
    }, []);

    useEffect(() => {
        if (state) {
            axios.get(`${URL}/states/${state}`)
                .then(r => setCityList(r.data))
                .catch(() => {
                    Toast.show({
                        text: "Unable to access the database",
                        buttonText: "Okay"
                    })
                    setTimeout(() => {
                        navigation.navigate('Profile')
                    }, 5000)
                })
        };
    }, [state]);


    const submitState = () => {
        const userData = {
            user: {
                id,
                city_id: newCity_Id
            }
        }
        const url = `${URL}/users/`
        axios.put(url, userData, {
            headers: {
                "x-access-token": userToken
            }
            })
            .then(() => {
                setShouldRefresh(currentState => !currentState);
                navigation.navigate('User Profile');
            })
            .catch((err) => {
                console.log(err);
                Toast.show({
                text: "Unable to access the database",
                buttonText: "Okay"
            })
            setTimeout(() => {
                navigation.navigate('Profile')
            }, 5000)
        })
    }

    if (!state) {
        return (
            <Container>
                <Content>
                    <Spinner />
                </Content>
            </Container>
        )
    }
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
                        selectedValue={newCity_Id}
                        onValueChange={setNewCity_Id}
                        >
                            {cityList.map((city, i) => (
                                <Picker.Item label={city.city} value={city.id} key={uuid()} />
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
                    onPress={submitState}
                    >
                    <Text>Submit</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
);
}