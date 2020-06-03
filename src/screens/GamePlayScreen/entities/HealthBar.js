import React from 'react';
import {View, Text} from 'react-native';
import configs from './../game_config';

const {windowWidth} = configs;
const {hpBarDuration} = configs;

const TopScreen = props => {
  const {health, maxHealth, hpDiff, hpFrame} = props;
  return (
    <React.Fragment>
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          left: 0,
          bottom: 10,
          width: windowWidth,
          height: 26,
          borderRadius: 10,
          borderWidth: 3,
          borderColor: 'black',
        }}
      />
      <View
        style={{
          backgroundColor: '#0dde56',
          position: 'absolute',
          left: 3,
          bottom: 13,
          width: ((windowWidth - 6) * health) / maxHealth,
          height: 20,
          borderTopLeftRadius: 9,
          borderBottomLeftRadius: 9,
          borderTopRightRadius: health / maxHealth === 1 ? 9 : 0,
          borderBottomRightRadius: health / maxHealth === 1 ? 9 : 0,
        }}
      />
      {hpDiff !== 0 && (
        <View
          style={[
            {
              backgroundColor: hpDiff > 0 ? '#daff6b' : '#b53131',
              position: 'absolute',
              width: Math.max(
                0,
                Math.abs(
                  ((windowWidth - 6) *
                    (hpDiff - hpDiff * (hpFrame / hpBarDuration))) /
                    maxHealth,
                ),
              ),
              bottom: 13,
              height: 20,
              borderTopRightRadius: health / maxHealth === 1 ? 9 : 0,
              borderBottomRightRadius: health / maxHealth === 1 ? 9 : 0,
              borderTopLeftRadius: health / maxHealth === 0 ? 9 : 0,
              borderBottomLeftRadius: health / maxHealth === 0 ? 9 : 0,
            },
            hpDiff > 0
              ? {
                  right:
                    3 +
                    Math.abs(
                      (windowWidth - 6) * ((maxHealth - health) / maxHealth),
                    ),
                }
              : {
                  left: 3 + ((windowWidth - 6) * health) / maxHealth,
                },
          ]}
        />
      )}
      <Text
        style={{
          position: 'absolute',
          left: 25,
          bottom: 13,
        }}>{`${health}/${maxHealth}`}</Text>
    </React.Fragment>
  );
};

export default TopScreen;
