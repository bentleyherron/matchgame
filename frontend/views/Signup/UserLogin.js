import React, {useContext} from 'react';
import { Container, Content, Form, Item, Input, Left, Right, Radio, Button, Text } from 'native-base';
import SignupContext from './SignupContext';

export default function SignupPageOne({ navigation }) {

    // TODO: add validation for login

    const { setUsername, setEmail, setPassword } = useContext(SignupContext).actions;
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
                onChangeText={text => setPassword(text)}/>
            </Item>
          </Form>
          <Button
              rounded
              style={{marginLeft: 20, marginRight: 20, marginTop: 15, padding: 20, justifyContent: 'center'}}
              onPress={() => {navigation.navigate('Feed')}}>
              <Text>LOGIN</Text>
          </Button>
          <Text note onPress={() => navigation.navigate('Login')} style={{margin: 20, padding: 20, textAlign: 'center'}}>Don't have an account? <Text note style={{color: 'blue'}}>Register Here</Text></Text>
        </Content>
      </Container>
    );
}