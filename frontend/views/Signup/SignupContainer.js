import React, { useState } from 'react';
import { Container, Header, Body, Left, Right, Title } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import SignupPageOne from './SignupPageOne';
import SignupPageTwo from './SignupPageTwo';
import SignupPageThree from './SignupPageThree';
import SignupPageFour from './SignupPageFour';

export default function SignupContainer() {

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [sports, setSports] = useState([]);
    const [agreedToTerms, setAgreed] = useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [currentPage, setCurrentPage] = useState('pageOne');

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
          }
      
          setSelectedImage({ localUri: pickerResult.uri });
    }

    const handleTermsClick = () => {
        if (agreedToTerms === false) {
            setAgreed(true)
        } else {
            setAgreed(false)
        }
    }

    const handleNextPageClick = () => {
        console.log({username}, {email}, {password}, {agreedToTerms});
        console.log(selectedImage);
        console.log('next button clicked');
        if (currentPage === 'pageOne') {
            setCurrentPage('pageTwo');
        } else if (currentPage === 'pageTwo') {
            setCurrentPage('pageThree');
        } else if (currentPage === 'pageThree') {
            setCurrentPage('pageFour');
        } else if (currentPage === 'pageFour') {
            setCurrentPage('feed');
        }
    }

    const handleSportSelect = (sportName) => {
        if (sports.includes(sportName)) {
            setSports(sports.filter(item => item !== sportName))
        } else {
            setSports([...sports, sportName]);
            
        }
    }

    let content;
    let headerTitle;
    if (currentPage === 'pageOne') {
        headerTitle = 'Create Profile'
        content = <SignupPageOne
        setUsername={setUsername}
        setEmail={setEmail}
        email={email}
        setPassword={setPassword}
        setSports={setSports}
        setAgreed={setAgreed}
        agreedToTerms={agreedToTerms}
        onTermsClick={handleTermsClick}
        onNextClick={handleNextPageClick}/>
    }  else if (currentPage === 'pageTwo') {
        headerTitle = 'Create Profile'
        content = <SignupPageTwo
        selectedImage={selectedImage}
        openImagePicker={openImagePickerAsync}
        onNextClick={handleNextPageClick}/>
    } else if (currentPage === 'pageThree') {
        headerTitle = 'Create Profile'
        content = <SignupPageThree
        onSportSelect={handleSportSelect}
        topSports={sports}
        onNextClick={handleNextPageClick}/>
    } else if (currentPage === 'pageFour') {
        headerTitle = 'Complete'
        content = <SignupPageFour
        />
    }

    return (
        <Container>
            <Header>
                <Left/>
                <Body>
                    <Title>{headerTitle}</Title>
                </Body>
                <Right/>
            </Header>
            {content}
        </Container>
    );
}