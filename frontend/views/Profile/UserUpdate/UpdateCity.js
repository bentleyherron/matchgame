import React, {useState, useEffect, useContext} from 'react';
import {Text, Content, Container, Picker, Form, Item, Icon, Button, Footer, FooterTab, Spinner} from 'native-base';
import axios from 'axios';
import { URL } from 'react-native-dotenv';
import UserContext from '../../../UserContext';

export default function UpdateCity({ navigation }) {
    const {userToken, userData} = useContext(UserContext).state;
    const {id, city_id}= userData.userInfo;
    const [newCity_Id, setNewCity_Id] = useState(null);
    const [state, setState] = useState(null);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        setNewCity_Id(city_id);
        try{
            axios.get(`${URL}/states/city/${city_id}`)
                .then(r => {
                    setState(r.data[0].state_id)}
                    )
        }catch(err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        try{
            axios.get(`${URL}/states`)
                .then(r => setStateList(r.data))
        }catch(err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        if (state) {
            try{
                axios.get(`${URL}/states/${state}`)
                    .then(r => setCityList(r.data))
            }catch(err) {
                console.log(err);
            }
        };
    }, [state]);


    const submitState = () => {
        try{
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
              });
            navigation.navigate('User Profile');
        }catch(err) {
            console.log(err);
        }
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
                        selectedValue={newCity_Id}
                        onValueChange={setNewCity_Id}
                        >
                            {cityList.map((city, i) => (
                                <Picker.Item label={city.city} value={city.id} key={i + 'city'} />
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