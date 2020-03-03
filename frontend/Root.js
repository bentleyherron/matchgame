import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import App from './App';
const AppNavigator = StackNavigator(
  {
    Page: { screen: Page },
  }
);
export default () =>
  <Root>
    <AppNavigator>
        <App />
    </AppNavigator>
  </Root>;