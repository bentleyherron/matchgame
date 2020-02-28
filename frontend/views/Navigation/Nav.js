import React from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
export default function Nav({setPage, setLastPage, currentPage}) {
    return (
        <Footer>
          <FooterTab>
            <Button onPress={() => {setLastPage(currentPage);setPage('Profile')}}>
              <Text>Profile</Text>
            </Button>
            <Button>
              <Icon type="AntDesign" name="pluscircle" />
            </Button>
            <Button onPress={() => {setLastPage(currentPage);setPage('Feed')}}>
              <Text>Feed</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
}