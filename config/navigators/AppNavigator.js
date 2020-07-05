import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Homepage from '@screens/homepage';

export const AppStack = createStackNavigator({
  Homepage: Homepage,
},
{
  initialRouteName: 'Homepage',
}
);
