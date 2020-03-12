import React, {useState, useEffect, useContext} from 'react';
import { Container, Content, Form, Item, Input, Left, Right, Body, Radio, Button, Text, Footer, FooterTab, Toast } from 'native-base';
import SignupContext from './SignupContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';

// set up something else than onsubmitediting, maybe onlosefocus or something similar to catch if the user just goes to the next thing without submitting
// When person selects radio, doesn't actually select, add onclick to radio

export default function SignupPageOne({ navigation }) {
    const context = useContext(SignupContext);
    const { setUsername, setNickname, setEmail, setPassword } = context.actions;
    const { username, email } = context.state;
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    async function validateUsername() {
      try{
        const result = await axios.post(`${URL}/signup/check/`, {"user":{"username":username}})
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
      } catch(err) {
        Toast.show({
          text: "Unable to validate username",
          buttonText: "Okay"
      });
      }
      }

    async function validateEmail() {
      try{
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
          Toast.show({
            text: 'Invalid email address',
            buttonText: 'Okay',
            position: 'top'
          });
          setEmailError(error);
          return;
        }
        const result = await axios.post(`${URL}/signup/check/`, {"user":{"email":email}});
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
      } catch(err) {
        Toast.show({
          text: "Unable to validate email",
          buttonText: "Okay"
      });
      }
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
                onBlur={async () => validateEmail()}
                />
            </Item>
            <Item fixedLabel success={usernameError}>
              <Input
                name="username"
                placeholder='User Name'
                onChangeText={text => setUsername(text)}
                onBlur={async () => validateUsername()}
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
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                />
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
                <Text note >I agree to the terms of service</Text>
              </Body>
            </Item>
          </Form>
          <Text note onPress={() => navigation.navigate('User Login')} style={{margin: 20, padding: 20, textAlign: 'center'}}>Already have an account? <Text note style={{color: 'blue'}}>Sign in</Text></Text>
          
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
              <Text style={{fontSize: 15}}>NEXT</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
}
