import React, {useState, useEffect, useContext} from 'react';
import { Container, Content, Form, Item, Input, Left, Right, Body, Radio, Button, Text, Footer, FooterTab, Toast } from 'native-base';
import SignupContext from './SignupContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';
import { ShadowPropTypesIOS } from 'react-native';

export default function SignupPageOne({ navigation }) {
    const context = useContext(SignupContext);
    const { setUsername, setNickname, setEmail, setPassword } = context.actions;
    const { username, email } = context.state;
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    async function validateUsername() {
      const result = await axios.post(`${URL}/users/check/`, {"user":{"username":username}})
      if (result.data.usernameFound) {
        Toast.show({
          text: 'Username already taken',
          buttonText: 'Okay',
          position: 'top'
        });
        setUsernameError(false);
        return;
      } else {
        setUsernameError(true);
      }
    }

    async function validateEmail() {
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        Toast.show({
          text: 'Invalid email address',
          buttonText: 'Okay',
          position: 'top'
        });
        setEmailError(error);
        return;
      }
      const result = await axios.post(`${URL}/users/check`, {"user":{"email":email}});
      if (result.data.emailFound) {
        Toast.show({
          text: 'Email address has been used',
          buttonText: 'Okay',
          position: 'top'
        });
        setEmailError(false);
        return;
      }
      setEmailError(true);
    }

    function validateNickname() {
      // check for curse words
    }

    function validatePassword() {
      // make sure password meets criteria
    }

    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel success={emailError}>
              <Input 
                placeholder='Email'
                name="email"
                onChangeText={text => setEmail(text)}
                onSubmitEditing={async () => validateEmail()}
                />
            </Item>
            <Item fixedLabel success={usernameError}>
              <Input
                name="username"
                placeholder='User Name'
                onChangeText={text => setUsername(text)}
                onSubmitEditing={async () => validateUsername()}
                />
            </Item>
            <Item fixedLabel>
              <Input
                name="nickname"
                placeholder='Nickname'
                onChangeText={text => setNickname(text)}/>
            </Item>
            <Item fixedLabel>
              <Input 
                placeholder='Password'
                name="password"
                onChangeText={text => setPassword(text)}/>
            </Item>
            <Item selected={true}
                  onPress={() => setAgreedToTerms(!agreedToTerms)}
                  style={{padding:10}}
                  >
              <Left>
                <Radio
                  color={"#f0ad4e"}
                  selectedColor={"#5cb85c"}
                  selected={agreedToTerms}
                />
              </Left>
              <Body>
                <Text note>I agree to the terms of service</Text>
              </Body>
            </Item>
          </Form>
          <Text note style={{margin: 20}}>Already have an account? <Text note style={{color: 'blue'}} onPress={() => {navigation.navigate('User Login')}}>Sign in</Text></Text>
          
        </Content>
        <Footer>
          <FooterTab>
            <Button
            onPress={() => {
              if(emailError && usernameError) {
                navigation.navigate('Location');
              } else {
                Toast.show({
                  text:"Valid Username and Email Required",
                  buttonText:"Okay",
                  position:"top"
                })
              }
              
            }}
            >
              <Text>NEXT</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
}
