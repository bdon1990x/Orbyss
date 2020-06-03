import React from 'react';
import {View, Text} from 'react-native';
import configs from './../game_config';

const {size, left_offset, top_offset, cols, removeOrbDuration} = configs;

const orbColors = {
  fire: '#FF4900',
  water: '#0093FF',
  grass: '#00EB1C',
  light: '#F3FF00',
  dark: '#6C00FF',
  empty: '#ffffff',
  heart: '#ffa6e3',
};

const Orb = props => {
  const {x, y, left, top, type, moveX, moveY, opacity, emptyIn} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: orbColors[type],
        opacity: type === 'empty' ? 0 : opacity || 1,
        position: 'absolute',
        left: left || (moveX || x) * size + left_offset,
        top: top || (moveY || y) * size + top_offset,
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
      }}
    />
  );
};

export default Orb;
