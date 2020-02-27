import React from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Radio, Button, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SignupPageOne({onChange, onTermsClick, onNextClick, agreedToTerms}) {

    function handleTermsClick() {
      onClick();
      this.state.selected = true;
    }

    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Input 
                placeholder='Email'
                name="email"
                onChange={onChange}/>
            </Item>
            <Item fixedLabel>
              <Input
                name="username"
                placeholder='User Blame'
                onChange={onChange}/>
            </Item>
            <Item fixedLabel>
              <Input 
                placeholder='Password'
                name="password"
                onChange={onChange}/>
            </Item>
            <Item fixedLabel>
              <Input 
                placeholder='Confirm Password'
                name="password"
                onChange={onChange}/>
            </Item>
            <Item selected={true}>
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
          <Button
            rounded
            onPress={onNextClick}>
            <Text>SIGN UP</Text>
          </Button>
        </Content>
      </Container>
    );
}
