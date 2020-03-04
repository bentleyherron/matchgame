import React, {useContext} from 'react';
import { Container, Content, Text, Button, Thumbnail, Footer, FooterTab } from 'native-base';
import SignupContext from './SignupContext';

export default function SignupPageTwo({ navigation }) {
    const { openImagePicker } = useContext(SignupContext).actions;
    const { selectedImage } = useContext(SignupContext).state;

    return(
        <Container>
            <Content>
                <Content />
                {selectedImage ? <Thumbnail large source={{ uri: selectedImage }} /> : null}
                <Button primary onPress={openImagePicker}>
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
                    onPress={() => navigation.navigate('Favorite Sports')}
                    >
                    <Text>NEXT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );

}
