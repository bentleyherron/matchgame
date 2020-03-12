import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Text, Button, Thumbnail, Footer, FooterTab, Spinner, Card, CardItem } from 'native-base';
import SignupContext from './SignupContext';

// figure out how to set default image if user doesn't select one

export default function SignupPageTwo({ navigation }) {
    const { openImagePicker, setSelectedImage } = useContext(SignupContext).actions;
    const { selectedImage } = useContext(SignupContext).state;

    const styles = StyleSheet.create({
        contentContainer: {
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: '#fafafa',
        },
        pickPhotoButton: {
            marginTop: 15,
            justifyContent: 'center',
            backgroundColor: '#02A456'
        },
        profilePhotoContainer: {
            marginTop: 15,
            justifyContent: 'center',
            backgroundColor: '#fafafa'
        }
    });

    return(
        <Container>
            <Content style={styles.contentContainer}>
                <Card transparent style={styles.profilePhotoContainer}>
                    <CardItem transparent style={styles.profilePhotoContainer}>
                        {selectedImage ? <Thumbnail large source={{ uri: selectedImage }} /> : null}
                    </CardItem>
                </Card>
                

                
                <Button primary rounded style={styles.pickPhotoButton} onPress={() => {openImagePicker();setShowSpinner(true)}}>
                    <Text>Upload</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                    onPress={() => navigation.goBack()}
                    >
                    <Text style={{fontSize: 15}}>PREV</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button
                    onPress={() => {
                        navigation.navigate('Favorite Sports');
                    }}
                    >
                    <Text style={{fontSize: 15}}>NEXT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );

}
