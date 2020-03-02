import React, {useState, useEffect} from 'react';
import {Text, Content, Container, Picker, Form, Item, Icon, Button, ListItem} from 'native-base';
import axios from 'axios';

export default function LocationSignup({onNextClick, locationId, setLocationId}) {
    const [state, setState] = useState(null);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        async function fetchStateData() {
            const url = `https://62f4056c.ngrok.io/states/`;
            const results = await axios.get(url);
            console.log(results.data);
            setStateList(results.data);
            console.log(stateList);
        }
        fetchStateData();
    }, []);

    useEffect(() => {
        async function fetchCityData() {
            const url = `https://62f4056c.ngrok.io/states/${state}`;
            const results = await axios.get(url);
            console.log(results.data);
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
            <Button
                rounded
                onPress={onNextClick}>
                <Text>NEXT</Text>
            </Button>
        </Container>
);
}