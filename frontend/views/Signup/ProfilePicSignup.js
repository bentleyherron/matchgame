import React from 'react';
import { Container, Content, Text, Button, H1, Thumbnail, Footer, FooterTab } from 'native-base';

export default function SignupPageTwo({ openImagePicker, selectedImage, onNextClick, onPrevClick }) {

      let photoContent;

      if (selectedImage !== null) {
          photoContent = <Thumbnail large
          source={{ uri: selectedImage }}
          />;

      }

    return(
        <Container>
            <Content>
                <H1>Upload Profile Photo</H1>
                {photoContent}
                <Button primary onPress={openImagePicker}>
                    <Text>Pick a photo</Text>
                </Button>
                
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                    onPress={onPrevClick}
                    >
                    <Text>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={onNextClick}
                    >
                    <Text>NEXT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );

}
