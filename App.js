import followers from './screens/Followers'
import {createAppContainer, Navigation} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import search from './screens/Search';



const AppNavigator = createStackNavigator(
  {
    Home: { screen : search,
            params : {user : 'Unn4m3DD'},
            navigationOptions: () => ({
              title: `Github Social Club`,
              headerBackTitle: 'Go Back',
              headerStyle : {backgroundColor : 'black'},
              headerTitleStyle: {color: 'white'},
              headerTruncatedBackTitle: `Back`
            }),
          },
    followers: {
              screen: followers,
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

