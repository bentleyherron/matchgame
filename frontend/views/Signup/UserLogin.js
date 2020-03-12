import React, {useState, useContext} from 'react';
import { Container, Content, Form, Item, Input, Left, Right, Radio, Button, Text, Spinner, Toast } from 'native-base';
import SignupContext from './SignupContext';
import UserContext from '../../UserContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';

export default function SignupPageOne({ navigation }) {

    // TODO: add validation for login
    // ADD FAILURE ERROR HANDLING
    const {actions, state} = useContext(UserContext);
    const {setUserToken, setHasSignedUp} = actions;
    const {email, password} = useContext(SignupContext).state;
    const { setUsername, setEmail, setPassword } = useContext(SignupContext).actions;
    const [isLogginIn, setIsLoggingIn] = useState(false);

    const postLogin = async () => {
      setIsLoggingIn(true);
        axios.post(`${URL}/login/`, {user: {
          email,
          password
        }}).then(r => {
          setUserToken(r.data.token);
          setHasSignedUp(true);
          setIsLoggingIn(false);
          navigation.navigate('Profile');
        }).catch(
          Toast.show({
            text: "Login information invalid",
            buttonText: 'Okay',
            position: 'top'
          })
        )
    }
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel style={{padding: 10, marginBottom: 10, marginTop: 10}}>
              <Input 
                placeholder='Email'
                name="email"
                onChangeText={text => setEmail(text)}/>
            </Item>
            <Item fixedLabel style={{padding: 10, marginBottom: 30}}>
              <Input 
                placeholder='Password'
                name="password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}/>
            </Item>
          </Form>
          <Button
              rounded
              style={{marginLeft: 20, marginRight: 20, marginTop: 15, padding: 20, justifyContent: 'center'}}
              onPress={() => {postLogin()}}>
              <Text>LOGIN</Text>
          </Button>
          <Text note onPress={() => navigation.navigate('Login')} style={{margin: 20, padding: 20, textAlign: 'center'}}>Don't have an account? <Text note style={{color: 'blue'}}>Register here</Text></Text>
        </Content>
      </Container>
    );
}