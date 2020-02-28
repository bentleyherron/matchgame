import React from 'react';
import { View, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Radio, Text, Button, H1, Thumbnail } from 'native-base';

export default function SignupPageFour({onNextClick}) {

    return(
        <Container>
            <Content>
                <H1>Welcome to MatchGame!</H1>
            </Content>
            <Button rounded onPress={onNextClick}>
                <Text>
                    See Your Challenge Feed
                </Text>
            </Button>
        </Container>
    );

}
