import React, {useState} from 'react';
import { Container, Content, Form, Item, Input, Left, Right, Radio, Button, Text, Footer, FooterTab } from 'native-base';

export default function SignupPageOne({ onNextClick, onPrevClick, setUsername, setNickname, setEmail, setPassword, username, email, password, nickname }) {
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    function validateUsername() {
      return username.length > 0 && email.length > 0;
    }

    function validateEmail() {

    }

    function validateNickname() {

    }

    function validatePassword() {

    }

    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Input 
                placeholder='Email'
                name="email"
                onChangeText={text => setEmail(text)}/>
            </Item>
            <Item fixedLabel>
              <Input
                name="username"
                placeholder='User Name'
                onChangeText={text => setUsername(text)}/>
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
                  onPress={() => setAgreedToTerms(!agreedToTerms)}>
              <Left>
                <Radio
                  color={"#f0ad4e"}
                  selectedColor={"#5cb85c"}
                  selected={agreedToTerms}
                />
              </Left>
              <Right>
                <Text>I agree to the terms of service</Text>
              </Right>
          </Item>
          </Form>
          
        </Content>
        <Footer>
          <FooterTab>
            <Button
            onPress={onNextClick}
            >
              <Text>NEXT</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
}
