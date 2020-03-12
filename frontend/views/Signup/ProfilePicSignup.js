import React, {useState, useContext, useEffect} from 'react';
import { Container, Content, Text, Button, Thumbnail, Footer, FooterTab, Spinner } from 'native-base';
import SignupContext from './SignupContext';

// figure out how to set default image if user doesn't select one

export default function SignupPageTwo({ navigation }) {
    const { openImagePicker, setSelectedImage } = useContext(SignupContext).actions;
    const { selectedImage } = useContext(SignupContext).state;

    return(
        <Container>
            <Content contentContainerStyle={{justifyContent: "center", alignItems: "center", margin: 30}}>
                {selectedImage ? <Thumbnail style={{margin: 30}} large source={{ uri: selectedImage }} /> : null}
                <Button primary onPress={() => openImagePicker()}>
                    <Text>Pick a photo</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                    onPress={() => navigation.goBack()}
                    >
                    <Text>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={() => {
                        navigation.navigate('Favorite Sports');
                    }}
                    >
                    <Text>NEXT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );

}
