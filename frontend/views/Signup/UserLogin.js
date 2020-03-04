import React from 'react';
import { Container, Content, Form, Item, Input, Left, Right, Radio, Button, Text } from 'native-base';

export default function SignupPageOne({ setUsername, setEmail, setPassword, navigation }) {

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
                placeholder='Password'
                name="password"
                onChangeText={text => setPassword(text)}/>
            </Item>
          </Form>
        </Content>
        <Button
            rounded
            onPress={() => {navigation.navigate('Feed')}}>
            <Text>LOGIN</Text>
          </Button>
      </Container>
    );
}