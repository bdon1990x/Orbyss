import React from 'react';
import {View, Text} from 'react-native';
import configs from '../game_config';

const {top_offset, hpIndicatorDuration} = configs;
const fadeDuration = 5;

const HpIndicator = props => {
  const {amount, frame} = props;
  const fadeFrame = hpIndicatorDuration - frame;
  return (
    <Text
      style={{
        position: 'absolute',
        fontSize: 25,
        color: amount > 0 ? '#00c738' : 'red',
        fontWeight: 'bold',
        opacity:
          amount === 0
            ? 1
            : fadeFrame <= fadeDuration
            ? fadeFrame / fadeDuration
            : 1,
        top:
          amount > 0
            ? top_offset - 60 - frame * 0.5
            : top_offset - 20 + frame * 0.5,
        right: 50,
        textShadowOffset: {
          width: 1,
          height: 1,
        },
        textShadowColor: 'black',
        textShadowRadius: 3,
      }}>
      {amount > 0 ? `+${amount}` : amount < 0 ? `${amount}` : ''}
    </Text>
  );
};

export default HpIndicator;
