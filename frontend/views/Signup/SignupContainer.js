import React, { useState } from 'react';
import {View, Text} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Thumbnail, H1 } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

import SignupPageOne from './SignupPageOne';
import SignupPageTwo from './SignupPageTwo';
import SignupPageThree from './SignupPageThree';

export default function SignupContainer() {

    const [inputValues, setInputValues] = useState({
        username: '',
        email: '',
        password: '',
        sports: '',
        photo: '',
        team: '',
        agreedToTerms: false
    })

    const [currentPage, setCurrentPage] = useState('pageOne');

    const [selectedImage, setSelectedImage] = React.useState(null);

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            return;
          }
      
          setSelectedImage({ localUri: pickerResult.uri });
    }

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({...inputValues, [name]: value})
    }

    const handleTermsClick = () => {
        console.log('radio clicked');
        if (inputValues.agreedToTerms === false) {
            setInputValues({agreedToTerms: true})
        } else {
            setInputValues({agreedToTerms: false})
        }
    }

    const handleNextPageClick = () => {
        console.table(inputValues);
        console.log(inputValues.agreedTerms);
        console.log(selectedImage);
        if (currentPage === 'pageOne') {
            setCurrentPage('pageTwo');
        } else if (currentPage === 'pageTwo') {
            setCurrentPage('pageThree')
        }
    }

    let content;
    if (currentPage === 'pageOne') {
        content = <SignupPageOne
        email={inputValues.email}
        username={inputValues.username}
        password={inputValues.password}
        sports={inputValues.password}
        photo={inputValues.photo}
        team={inputValues.team}
        agreedToTerms={inputValues.agreedToTerms}
        onChange={handleOnChange}
        onTermsClick={handleTermsClick}
        onNextClick={handleNextPageClick}/>
    }  else if (currentPage === 'pageTwo') {
        content = <SignupPageTwo
        selectedImage={selectedImage}
        openImagePicker={openImagePickerAsync}
        onNextClick={handleNextPageClick}/>
    } else {
        content = <SignupPageThree/>
    }

    return (
        <Container>
            {content}
        </Container>
    );
}