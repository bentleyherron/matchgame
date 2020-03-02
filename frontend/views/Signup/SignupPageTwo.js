import React from 'react';
import { Container, Content, Text, Button, H1, Thumbnail } from 'native-base';

export default function SignupPageTwo({openImagePicker, selectedImage, onNextClick}) {

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
            <Button onPress={onNextClick}>
                    <Text>
                        Next
                    </Text>
                </Button>
        </Container>
    );

}
