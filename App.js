import { StatusBar } from 'expo-status-bar';
import followers from './screens/Followers'
import {createAppContainer, Navigation} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';



const AppNavigator = createStackNavigator(
  {
    Home: { screen : followers,
            params : {user : 'Unn4m3DD'},
            navigationOptions: () => ({
              title: `Github Social Club`,
              headerBackTitle: 'Go Back',
              headerStyle : {backgroundColor : 'black'},
              headerTitleStyle: {color: 'white'},
              headerTruncatedBackTitle: `Back`
            }),
          }
  },
  {
    initialRoute: 'Home',
  })

  const App = createAppContainer(AppNavigator);

  export default App;

