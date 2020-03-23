import React, { useContext } from 'react';
import { Text, Button, Toast } from 'native-base';
import UserContext from '../../UserContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';

export default function PostEvent({ setPage, challenge }) {
    // destructure challenge for readability
    const { id } = challenge;

    // grab userData and actions from user context
    const {state, actions} = useContext(UserContext)
    const { userToken } = state;
    const {setShouldRefresh} = actions;

    // grab context from challenge context
    const deleteChallenge = async () => {
            // deletes challenge
            const eventUrl = `${URL}/challenges/${id}`;
            axios.delete(eventUrl, {headers: {"x-access-token": userToken}})
                .then(r => {
                        setPage(0);
                        // setShouldRefresh(currentState => !currentState);
                    })
                .catch((err) => {
                    console.log(err);
                    Toast.show({
                        text: "Unable to delete challenge",
                        buttonText: "Okay"
                    })
                }
                );
    }

    return(
        <Button
            rounded
            danger
            onPress={() => deleteChallenge()}>
            <Text>Delete</Text>
        </Button>
    );
}