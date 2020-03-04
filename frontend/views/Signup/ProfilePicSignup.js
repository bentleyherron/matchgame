import React from 'react';
import { Container, Content, Text, Button, H1, Thumbnail, Footer, FooterTab } from 'native-base';

export default function SignupPageTwo({ openImagePicker, selectedImage, navigation }) {

      let photoContent;

      if (selectedImage !== null) {
          photoContent = <Thumbnail large
          source={{ uri: selectedImage }}
          />;

      }

    return(
        <Container>
            <Content>
                <Content />
                {photoContent}
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
