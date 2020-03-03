import React from 'react';
import { Container, Content, Form, Item, Input, Left, Right, Radio, Button, Text } from 'native-base';

export default function SignupPageOne({ onTermsClick, onNextClick, agreedToTerms, setUsername, setNickname, setEmail, setPassword }) {

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
                  onPress={onTermsClick}>
              <Left>
                <Radio
                  color={"#f0ad4e"}
                  selectedColor={"#5cb85c"}
                  selected={agreedToTerms}
                  onPress={onTermsClick}
                />
              </Left>
              <Right>
                <Text>I agree to the terms of service</Text>
              </Right>
          </Item>
          </Form>
          
        </Content>
        <Button
            rounded
            onPress={onNextClick}>
            <Text>SIGN UP</Text>
          </Button>
      </Container>
    );
}