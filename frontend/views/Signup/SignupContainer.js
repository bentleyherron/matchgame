import React, { useState } from 'react';
import { Container, Header, Body, Left, Right, Title } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import LoginSignup from './LoginSignup';
import LocationSignup from './LocationSignup';
import ProfilePicSignup from './ProfilePicSignup';
import FavoriteSportsSignup from './FavoriteSportsSignup';
import ReviewSignup from './ReviewSignup';


export default function SignupContainer({
    currentPage,
    setCurrentPage,
    setUserData,
    userData,
    setFavoriteSports,
    favoriteSports
}) {

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [agreedToTerms, setAgreed] = useState(false);
    const [locationId, setLocationId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sports, setSports] = useState([]);
    const [nickname, setNickname] = useState(null);

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true});

        if (pickerResult.cancelled === true) {
            return;
          }
      
          setSelectedImage("data:image/png;base64," + pickerResult.base64);
    }

    const handleTermsClick = () => {
        if (agreedToTerms === false) {
            setAgreed(true)
        } else {
            setAgreed(false)
        }
    }

    const handleNextPageClick = () => {
        if (currentPage === 'pageOne') {
            setCurrentPage('pageTwo');
        } else if (currentPage === 'pageTwo') {
            setCurrentPage('pageThree');
        } else if (currentPage === 'pageThree') {
            setCurrentPage('pageFour');
        } else if (currentPage === 'pageFour') {
            setCurrentPage('pageFive');
        } else if (currentPage === 'pageSix') {
            setCurrentPage('Feed');
        }
    }
    // get the sports objects from the database
    // show the sports objects
    // when user clicks on each sport,
    // add sport object to favorite sports
    // update selected by checking if sport object is in favorite sports
    // 
    const handleSportSelect = (sport) => {
        if (sports.filter(item => item.name === sport.name)) {
            setSports(sports.filter(item => item.name !== sport.name))
        } else {
            setSports([...sports, sport]);
        }
    }

    let content;
    let headerTitle;
    if (currentPage === 'pageOne') {
        headerTitle = 'Create Profile'
        content = <LoginSignup
        setUsername={setUsername}
        setNickname={setNickname}
        setEmail={setEmail}
        email={email}
        setPassword={setPassword}
        setAgreed={setAgreed}
        agreedToTerms={agreedToTerms}
        onTermsClick={handleTermsClick}
        onNextClick={handleNextPageClick}/>
    }  else if (currentPage === 'pageTwo') {
        headerTitle = 'Select Location';
        content = <LocationSignup
        locationId={locationId}
        setLocationId={setLocationId}
        onNextClick={handleNextPageClick}
        />
    } else if (currentPage === 'pageThree') {
        headerTitle = 'Select Profile Picture'
        content = <ProfilePicSignup
        selectedImage={selectedImage}
        openImagePicker={openImagePickerAsync}
        onNextClick={handleNextPageClick}/>
    } else if (currentPage === 'pageFour') {
        headerTitle = 'Select Favorite Sports'
        content = <FavoriteSportsSignup
        onSportSelect={handleSportSelect}
        topSports={sports}
        onNextClick={handleNextPageClick}/>
    } else if (currentPage === 'pageFive') {
        headerTitle = 'Review'
        content = <ReviewSignup
        onNextClick={handleNextPageClick}
        username={username}
        nickname={nickname}
        password={password}
        email={email}
        sports={sports}
        image={selectedImage}
        locationId={locationId}
        setUserData={setUserData}
        setFavoriteSports={setFavoriteSports}
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