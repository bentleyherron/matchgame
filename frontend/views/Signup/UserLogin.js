import React, {useContext} from 'react';
import { Container, Content, Form, Item, Input, Left, Right, Radio, Button, Text } from 'native-base';
import SignupContext from './SignupContext';

export default function SignupPageOne({ navigation }) {

    const { setUsername, setEmail, setPassword } = useContext(SignupContext).actions;
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