import React from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
export default function Nav({setPage, setLastPage, currentPage}) {
    return (
        <Footer>
          <FooterTab>
            <Button onPress={() => {setLastPage(currentPage);setPage('profile')}}>
              <Text>Profile</Text>
            </Button>
            <Button>
              <Icon type="AntDesign" name="pluscircle" />
            </Button>
            <Button onPress={() => {setLastPage(currentPage);setPage('feed')}}>
              <Text>Feed</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
}