import React, {useState, useEffect, useContext} from 'react';
import { Card, CardItem, H1, Text, Body, Left, Right, Button, Thumbnail, ListItem, Avatar } from 'native-base';
import PostEvent from './PostEvent';
import UserContext from '../../UserContext';

export default function Challenge({ challenge, setPage }) {
    const { team_from_id,
            datetime,
            wager,
            message,
            is_accepted,
            sport_id
           } = challenge;

    const {teams, userInfo} = useContext(UserContext).state.userData;
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
    console.log(didCreateChallenge);
    return (
        <ListItem avatar>
              <Left>
                <Thumbnail small source={require("../Profile/soccer.png")} />
              </Left>
              <Body>
                <Text>Team {team_from_id} Issued Challenge</Text>
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