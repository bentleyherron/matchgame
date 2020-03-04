import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { createStackNavigator } from '@react-navigation/stack';

import LoginSignup from './LoginSignup';
import LocationSignup from './LocationSignup';
import ProfilePicSignup from './ProfilePicSignup';
import FavoriteSportsSignup from './FavoriteSportsSignup';
import ReviewSignup from './ReviewSignup';

const Tab = createStackNavigator();

export default function SignupContainer({
    currentPage,
    setCurrentPage,
    setUserData,
    userData,
    setFavoriteSports,
    favoriteSports,
    setHasSignedUp
}) {
    // Need to refactor sports and favorite sports
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
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
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true, quality: 0.5, aspect:[100, 100]});

        if (pickerResult.cancelled === true) {
            return;
          }
      
          setSelectedImage("data:image/png;base64," + pickerResult.base64);
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
        } else if (currentPage === 'pageFive') {
            setCurrentPage('Feed');
        }
    }

    const handlePrevPageClick = () => {
        if (currentPage === 'pageTwo') {
            setCurrentPage('pageOne');
        } else if (currentPage === 'pageThree') {
            setCurrentPage('pageTwo');
        } else if (currentPage === 'pageFour') {
            setCurrentPage('pageThree');
        } else if (currentPage === 'pageFive') {
            setCurrentPage('pageFour');
        }
    }

    const handleSportSelect = (sport) => {
        if (sports.filter(item => item.name === sport.name).length) {
            setSports(sports.filter(item => item.name !== sport.name))
        } else {
            setSports([...sports, sport]);
        }
    }

    return (
        <Tab.Navigator initialRouteName="Login">
            <Tab.Screen name="Login" component={LoginSignup} options={{title:'Create Profile'}} initialParams={{
                setUsername,
                setNickname,
                setEmail,
                email,
                password,
                nickname,
                username,
                setPassword
                }} />
            <Tab.Screen name="Location" component={LocationSignup} options={{title: 'Select Location'}} initialParams={{
                locationId,
                setLocationId
            }} />
            <Tab.Screen name="Profile Pic" component={ProfilePicSignup} options={{title: 'Select Profile Picture'}} initialParams={{
                selectedImage,
                openImagePicker: openImagePickerAsync
            }} />
            <Tab.Screen name="Favorite Sports" component={FavoriteSportsSignup} options={{title: 'Select Your Favorite Sports'}} initialParams={{
                onSportSelect: handleSportSelect,
                topSports: sports
            }} />
            <Tab.Screen name="Review" component={ReviewSignup} options={{title: 'Review'}} initialParams={{
                username,
                nickname,
                password,
                email,
                sports,
                image: selectedImage,
                locationId,
                setUserData,
                setFavoriteSports,
                setHasSignedUp
            }} />
        </Tab.Navigator>
    );
}