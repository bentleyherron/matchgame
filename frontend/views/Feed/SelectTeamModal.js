import React, {useState, useEffect, useContext} from 'react';
import { Text, Button, Picker, Toast} from 'native-base';
import { Modal } from 'react-native';
import ChallengeContext from './ChallengeContext';
import axios from 'axios';
import {URL} from 'react-native-dotenv';

export default function TeamSelectModal({teams}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectTeam, setSelectTeam] = useState(null);
    return (
        <Modal
          animationType="fade"
          visible={modalVisible}
        >
            <Content>
                <Text>Select a team</Text>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={selectTeam}
                    onValueChange={setSelectTeam}>
                        {teams.map(team => 
                            <Picker.Item label={typeof sport === "string" ? sport : sportData[sport.sport_id - 1].name} value={typeof sport === "string" ? sport : sport.sport_id} key={uuid()} />
                        )}
                </Picker>
              <Button
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}>
                <Text>Cancel</Text>
              </Button>
            </Content>
        </Modal>
    );
  }