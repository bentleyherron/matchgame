import React from 'react';
import { Container, Content, Form, Item, Input, Body, Left, Right, Radio, Button, Text } from 'native-base';


export default function SignupPageOne({ onTermsClick, onNextClick, onSigninClick, agreedToTerms, setUsername, setEmail, setPassword }) {

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
              <Body>
                <Text note>I agree to the terms of service</Text>
              </Body>
            </Item>
                <Button
                rounded
                onPress={onNextClick}
                style={{margin: 20}}>
                <Text>Create your account</Text>
              </Button>
          </Form>
          <Text note style={{margin: 20}}>Already have an account? <Text note style={{color: 'blue'}} onPress={onSigninClick}>Sign in</Text></Text>
          
        </Content>
        
      </Container>
    );
}
