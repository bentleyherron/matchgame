import React, { useState } from 'react';
import {View, Text} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Thumbnail } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

import SignupPageOne from './SignupPageOne';
import SignupPageTwo from './SignupPageTwo';


export default function SignupContainer() {

    const [inputValues, setInputValues] = useState({
        username: '',
        email: '',
        password: '',
        sports: '',
        photo: '',
        team: '',
        termsOfService: 'false'
    })

    const [currentPage, setCurrentPage] = useState('SignupPageOne');

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

    const handleClick = event => {
        setInputValues({termsOfService: 'true'})
    }

    return (
        <Container>
            {/* <SignupPageOne
                email={inputValues.email}
                username={inputValues.username}
                password={inputValues.password}
                sports={inputValues.password}
                photo={inputValues.photo}
                team={inputValues.team}
                termsOfService={inputValues.termsOfService}
                onChange={handleOnChange}
                onClick={handleClick}/> */}
            <SignupPageTwo
                selectedImage={selectedImage}
                openImagePicker={openImagePickerAsync}/>
        </Container>
    );
}