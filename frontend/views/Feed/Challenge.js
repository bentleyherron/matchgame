import React, {useState, useEffect, useContext} from 'react';
import {Text, Body, Left, Right,  ListItem, Avatar, Icon } from 'native-base';
import PostEvent from './PostEvent';
import UserContext from '../../UserContext';

export default function Challenge({ challenge, setPage }) {
    const { team_from_id,
            datetime,
            wager,
            message,
            is_accepted,
            sport_id,
            title,
            team_from_name
           } = challenge;

    const {userData, sportIcons} = useContext(UserContext).state;
    const {teams, userInfo} = userData;
    const {id} = userInfo;

    const [isCaptain, setisCaptain] = useState(null);
    const [didCreateChallenge, setDidCreateChallenge] = useState(null);
    
    const checkCaptainAndSport = () => {
        const isCaptain = {};
        teams.forEach((team) => {
          if(team.captain_id === id) {
            team.sport_id ? isCaptain[team.sport_id] = true : null;
          }
        })
        return isCaptain;
      }

    const createTeamObj = () => {
      const teamObj = {};
      teams.forEach((team) => {
        teamObj[team.id] = true;
      })
      return teamObj;
    }

    useEffect(() => {
      setisCaptain(checkCaptainAndSport());
      setDidCreateChallenge(createTeamObj());
    }, [])

    
    const month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec'];
    const date = new Date(datetime);
    const formattedDate = `${month[date.getMonth()]} ${date.getDate()}`;

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    
    function formatTime(d) {
      let hours = addZero(d.getHours());
      let minutes = addZero(d.getMinutes());
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedTime = hours + ':' + minutes + ' ' + ampm;
      // const formattedTime = h + ":" + m;
      return formattedTime;
    }

    const formattedTime = formatTime(date);
    if(is_accepted) {
      return null;
    }

    return (
        <ListItem avatar>
              <Left>
                <Icon style={{fontSize:18}} type={sportIcons[sport_id -1].family} name={sportIcons[sport_id-1].icon} />
              </Left>
              <Body>
                <Text>{team_from_name} Issued Challenge</Text>
                <Text note>{message}</Text>
                <Text note>{wager} Pts · {formattedDate} · {formattedTime}</Text>
              </Body>
              <Right>
                {/* <Text note>3:50 pm</Text> */}
                {isCaptain ? 
                is_accepted || !isCaptain[sport_id] || didCreateChallenge[team_from_id]
                ? null
                : (<PostEvent
                      challenge={challenge}
                      setPage={setPage}
                    />)
                :
                null 
                }
                
              </Right>
        </ListItem>
    );
}