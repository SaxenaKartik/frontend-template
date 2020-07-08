import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Homepage from '@screens/homepage';
import Request from '@screens/request';

export const AppStack = createStackNavigator({
  Homepage: Homepage,
  Request : Request
},
{
  initialRouteName: 'Homepage',
}
);
