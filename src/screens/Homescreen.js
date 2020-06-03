import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const Homescreen = props => {
  const {navigation} = props;
  return (
    <View>
      <Text>Home Screen</Text>

      <TouchableOpacity
        style={{backgroundColor: 'lightblue', marginTop: 5}}
        onPress={() => {
          navigation.navigate('Game', {gameMode: 'SURVIVAL'});
        }}>
        <Text>PLAY SURVIVAL</Text>
      </TouchableOpacity>
      {/*
      <TouchableOpacity
        style={{backgroundColor: 'lightgreen', marginTop: 5}}
        disabled={true}
        onPress={() => {
          navigation.navigate('Highscores');
        }}>
        <Text>GO TO HIGHSCORES</Text>
      </TouchableOpacity>
      */}
    </View>
  );
};

export default Homescreen;
