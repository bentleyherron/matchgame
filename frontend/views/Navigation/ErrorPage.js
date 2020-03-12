import React from 'react';
import {Container, Content, Text, Card, CardItem, Icon} from 'native-base';

export default function ErrorPage() {
    return(
        <Container>
            <Content contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 40, paddingHorizontal: 10}}>
                <Card>
                    <CardItem>
                        <Text>
                            Sorry, something went wrong! You will be redirected back to the login screen.
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Icon type="MaterialIcons" name="error" />
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}