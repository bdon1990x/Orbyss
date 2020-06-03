import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import axios from './../../api/server';
import AsyncStorage from '@react-native-community/async-storage';

const HighscoreScreen = props => {
  const {navigation} = props;
  const [scores, setScores] = useState([]);
  const [username, setUsername] = useState('');
  const getScores = async () => {
    const username = await AsyncStorage.getItem('username');
    const {data} = await axios.get('/scores');
    const filteredScores = data.filter(score => score.username === username);
    setScores(filteredScores);
    setUsername(username);
    console.log(filteredScores);
  };
  useEffect(() => {
    if (scores.length === 0) getScores();
  });

  return (
    <View>
      <Text>Highscore Screen</Text>
      <Text>{`Player :${username}`}</Text>
      <Text>Scores:</Text>
      <FlatList
        data={scores}
        keyExtractor={(item, index) => item._id}
        renderItem={({item}) => <Text>{item.points}</Text>}
      />
      <TouchableOpacity
        style={{backgroundColor: 'orange'}}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text>GO TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HighscoreScreen;
