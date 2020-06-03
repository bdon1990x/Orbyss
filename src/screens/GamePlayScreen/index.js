import React, {useState} from 'react';
import {TouchableOpacity, Text, FlatList} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {
  GridLogic,
  OrbAnimations,
  SurvivalLogic,
  PointCalculator,
  ScreenAnimations,
} from './systems';
import configs from './game_config';
import {Orb, TopScreen, HpIndicator} from './entities';

const {rows, cols} = configs;

const elements = ['fire', 'grass', 'water', 'light', 'dark', 'heart'];

const initGame = gameMode => {
  const entities = {};
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let type = elements[Math.floor(Math.random() * 6)];
      const index = x + y * cols;
      while (
        (x > 1 &&
          entities[index - 2].type == type &&
          entities[index - 2].y === y &&
          entities[index - 1].type === type &&
          entities[index - 1].y === y) ||
        (y > 1 &&
          entities[index - 2 * cols].type == type &&
          entities[index - cols].type === type)
      ) {
        type = elements[Math.floor(Math.random() * 6)];
      }
      entities[index] = {
        type,
        x,
        y,
        renderer: <Orb />,
      };
    }
  }
  entities.newGame = true;
  entities.clock = 0;
  entities.animationInProg = false;
  entities.topScreen = {
    combos: 0,
    points: 0,
    health: 100,
    maxHealth: 100,
    totalCombos: 0,
    moves: 0,
    moveStartTime: null,
    renderer: <TopScreen />,
    hpFrame: 0,
    hpDiff: 0,
  };
  entities.healIndicator = {
    amount: 0,
    frame: 0,
    renderer: <HpIndicator />,
  };
  entities.damageIndicator = {
    amount: 0,
    frame: 0,
    renderer: <HpIndicator />,
  };
  entities.gameMode = gameMode;
  entities.bleedAnimation = {};

  if (entities.gameMode === 'SURVIVAL') {
    entities.topScreen.level = 1;
    entities.bleedRate = 3;
    entities.levelupRate = 30;
  }
  return entities;
};

const GamePlayScreen = props => {
  const {navigation} = props;
  const {gameMode} = props.route.params;
  return (
    <GameEngine
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      systems={[
        GridLogic,
        OrbAnimations,
        PointCalculator,
        ScreenAnimations,
        gameMode === 'SURVIVAL' ? SurvivalLogic : '',
      ]}
      entities={initGame(gameMode)}>
      <TouchableOpacity
        style={{
          backgroundColor: 'lightgreen',
          position: 'absolute',
          top: 10,
          right: 0,
        }}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text>GO TO HOME</Text>
      </TouchableOpacity>
    </GameEngine>
  );
};

export default GamePlayScreen;
