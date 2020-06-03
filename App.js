import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/Homescreen';
import HighscoreScreen from './src/screens/HighscoreScreen';
import GamePlayScreen from './src/screens/GamePlayScreen';
import AsyncStorage from '@react-native-community/async-storage';

AsyncStorage.setItem('username', 'Brandon');
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode={'modal'}
        headerMode={'none'}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Highscores" component={HighscoreScreen} />
        <Stack.Screen name="Game" component={GamePlayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
