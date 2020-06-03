import React from 'react';
import {View, Text} from 'react-native';
import configs from './../game_config';
import HealthBar from './HealthBar';
const {left_offset, top_offset, size, cols, windowWidth} = configs;

const formatTime = time => {
  const mins = Math.round(time / 60000);
  const secs = Math.round((time % 60000) / 1000);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const TopScreen = props => {
  const {
    combos,
    points,
    health,
    maxHealth,
    time,
    moveStartTime,
    totalCombos,
    moves,
    level,
    hpFrame,
    hpDiff,
  } = props;
  return (
    <View
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowWidth,
        height: top_offset,
        opacity: 1,
      }}>
      {health === 0 && (
        <Text
          style={{
            position: 'absolute',
            left: (windowWidth - 300) / 2,
            top: 100,
            fontSize: 50,
          }}>
          GAME OVER
        </Text>
      )}
      <Text
        style={{
          position: 'absolute',
          left: 10,
          top: 5,
          fontSize: 20,
        }}>
        {`Game Time: ${formatTime(time)}`}
      </Text>
      <Text
        style={{
          position: 'absolute',
          left: 10,
          top: 25,
          fontSize: 20,
        }}>
        {`Level: ${level}`}
      </Text>
      <Text
        style={{
          position: 'absolute',
          left: 10,
          bottom: 100,
          fontSize: 20,
        }}>
        {`Moves: ${moves}`}
      </Text>
      <Text
        style={{
          position: 'absolute',
          left: 10,
          bottom: 80,
          fontSize: 20,
        }}>
        {`Average Combos: ${
          moves === 0 ? 0 : (totalCombos / moves).toFixed(2)
        }`}
      </Text>

      <Text
        style={{
          position: 'absolute',
          left: 10,
          bottom: 60,
          fontSize: 20,
        }}>
        {`Combos: ${combos}`}
      </Text>
      <Text
        style={{
          position: 'absolute',
          left: 10,
          bottom: 40,
          fontSize: 20,
        }}>
        {`Points: ${points}`}
      </Text>
      <Text
        style={{
          position: 'absolute',
          right: 10,
          bottom: 40,
          fontSize: 20,
        }}>
        {moveStartTime
          ? `Time Left: ${((6000 - (time - moveStartTime)) / 1000).toFixed(
              2,
            )} secs`
          : ''}
      </Text>
      <HealthBar
        health={health}
        maxHealth={maxHealth}
        hpFrame={hpFrame}
        hpDiff={hpDiff}
      />
    </View>
  );
};

export default TopScreen;
