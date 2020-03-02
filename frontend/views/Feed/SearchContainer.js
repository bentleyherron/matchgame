import React, {useState} from 'react';
import { Content, Text, Header, Input, Item, Icon, Button } from 'native-base';

export default function SearchContainer() {
    const [input, setInput] = useState(null);
    return (
        <Content>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" value={input} onChangeText={setInput} />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
            <Content>
                <Text>{input}</Text>
            </Content>
        </Content>
      );
}