import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { createStackNavigator } from '@react-navigation/stack';

import LoginSignup from './LoginSignup';
import LocationSignup from './LocationSignup';
import ProfilePicSignup from './ProfilePicSignup';
import FavoriteSportsSignup from './FavoriteSportsSignup';
import ReviewSignup from './ReviewSignup';
import UserLogin from './UserLogin';
import SignupContext from './SignupContext';

const Tab = createStackNavigator();

export default function SignupContainer() {
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

    const handleSportSelect = (sport) => {
        if (sports.filter(item => item.name === sport.name).length) {
            setSports(sports.filter(item => item.name !== sport.name))
        } else {
            setSports([...sports, sport]);
        }
    }

    const SignupContextValue = {
        state:{
            username,
            email,
            password,
            locationId,
            selectedImage,
            sports,
            nickname
        },
        actions: {
            setUsername,
            setEmail,
            setPassword,
            setLocationId,
            setSelectedImage,
            setSports,
            setNickname,
            openImagePicker: openImagePickerAsync,
            onSportSelect: handleSportSelect
        }
    }

    return (
        <SignupContext.Provider value={SignupContextValue}>
            <Tab.Navigator initialRouteName="User Login">
                <Tab.Screen name="Login" component={LoginSignup} options={{title:'Create Profile'}} />
                <Tab.Screen name="Location" component={LocationSignup} options={{title: 'Select Location'}} />
                <Tab.Screen name="Profile Pic" component={ProfilePicSignup} options={{title: 'Select Profile Picture'}} />
                <Tab.Screen name="Favorite Sports" component={FavoriteSportsSignup} options={{title: 'Select Your Favorite Sports'}} />
                <Tab.Screen name="Review" component={ReviewSignup} options={{title: 'Review'}} />
                <Tab.Screen name="User Login" component={UserLogin} />
            </Tab.Navigator>
        </SignupContext.Provider>
    );
}