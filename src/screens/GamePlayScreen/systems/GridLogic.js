import configs from '../game_config';
import {ForceTouchGestureHandler} from 'react-native-gesture-handler';

const {
  left_offset,
  top_offset,
  size,
  cols,
  rows,
  windowWidth,
  windowHeight,
  removeOrbDuration,
} = configs;
let grid = null;

let selectedOrb = null;
let orbsMoved = false;
let orbsMatched = false;
const elements = ['fire', 'grass', 'water', 'light', 'dark', 'heart'];
let delayFrames = 0;

const initGrid = entities => {
  grid = new Array(cols);
  for (let x = 0; x < cols; x++) {
    grid[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      const id = x + y * cols;
      grid[x][y] = {id, type: entities[id].type};
    }
  }
};

const printGrid = () => {
  for (let y = 0; y < rows; y++) {
    let row = '';
    for (let x = 0; x < cols; x++) {
      row = row.concat(`${grid[x][y].type}, `);
    }
    console.log(row);
  }
};

const boundX = x => {
  return Math.min(
    Math.max(x, left_offset + 0.5 * size),
    left_offset + cols * size - 0.5 * size,
  );
};

const boundY = y => {
  return Math.min(
    Math.max(y, top_offset + 1),
    top_offset + rows * size - 0.5 * size,
  );
};

const swapOrbs = (orb1, orb2, speed = 0.5) => {
  let temp = grid[orb1.x][orb1.y];
  grid[orb1.x][orb1.y] = grid[orb2.x][orb2.y];
  grid[orb2.x][orb2.y] = temp;
  temp = {x: orb1.x, y: orb1.y};
  orb1.x = orb2.x;
  orb1.y = orb2.y;
  orb2.x = temp.x;
  orb2.y = temp.y;

  if (orb1.x !== orb2.x) {
    if (!orb1.selected) {
      orb1.moveX = orb2.x;
      orb1.speed = speed;
    }
    orb2.moveX = orb1.x;
    orb2.speed = speed;
  }

  if (orb1.y !== orb2.y) {
    if (!orb1.selected) {
      orb1.moveY = orb2.y;
      orb1.speed = speed;
    }
    orb2.moveY = orb1.y;
    orb2.speed = speed;
  }
};

const getOrbAtPixel = (x, y, entities) => {
  for (const e in entities) {
    const orb = entities[e];
    if (
      x > orb.x * size + left_offset &&
      x <= (orb.x + 1) * size + left_offset &&
      y > orb.y * size + top_offset &&
      y <= (orb.y + 1) * size + top_offset
    ) {
      return e;
    }
  }
  return null;
};

const matchOrbs = entities => {
  let matched = [];
  const matches = [];
  for (const e in entities) {
    if (!entities[e].type) continue;
    const id = parseInt(e);
    if (entities[id].type !== 'empty' && !matched.map(m => m.id).includes(id)) {
      let match = [];
      floodFill(id, entities, [], match);
      matched = matched.concat(match);
      match = pruneMatch(match, entities);
      if (match.length > 2) {
        matches.push(match);
        return matches;
      }
    }
  }
  return matches;
};

const pruneMatch = (match, entities) => {
  const xCoords = match.map(m => entities[m.id].x);
  const yCoords = match.map(m => entities[m.id].y);
  const prunedMatch = [];
  for (const m of match) {
    const orb = entities[m.id];
    if (
      xCoords.filter(x => x === orb.x).length > 2 ||
      yCoords.filter(y => y === orb.y).length > 2
    ) {
      prunedMatch.push(m);
    }
  }
  return prunedMatch;
};

const floodFill = (e, entities, visited, match) => {
  const orb = entities[e];
  visited.push(e);
  if (match.length > 0 && orb.type !== match[0].type) {
    return;
  }
  match.push({id: e, type: orb.type});
  if (orb.x < cols - 1 && !visited.includes(grid[orb.x + 1][orb.y].id)) {
    floodFill(grid[orb.x + 1][orb.y].id, entities, visited, match);
  }
  if (orb.x > 0 && !visited.includes(grid[orb.x - 1][orb.y].id)) {
    floodFill(grid[orb.x - 1][orb.y].id, entities, visited, match);
  }
  if (orb.y < rows - 1 && !visited.includes(grid[orb.x][orb.y + 1].id)) {
    floodFill(grid[orb.x][orb.y + 1].id, entities, visited, match);
  }
  if (orb.y > 0 && !visited.includes(grid[orb.x][orb.y - 1].id)) {
    floodFill(grid[orb.x][orb.y - 1].id, entities, visited, match);
  }
};
const removeMatchedOrbs = (matches, entities) => {
  for (const match of matches) {
    for (const m of match) {
      const orb = entities[m.id];
      orb.emptyIn = removeOrbDuration;
      grid[orb.x][orb.y].type = 'empty';
    }
  }
};

const dropOrbs = entities => {
  const orbBuffer = new Array(cols).fill(-1);
  for (let y = rows - 1; y >= 0; y--) {
    for (let x = 0; x < cols; x++) {
      if (grid[x][y].type === 'empty') {
        const orb1 = entities[grid[x][y].id];
        let offset = 1;
        let orb2 = y === 0 ? {type: 'empty'} : entities[grid[x][y - offset].id];
        while (orb2.type === 'empty' && y - ++offset >= 0) {
          orb2 = entities[grid[x][y - offset].id];
        }
        if (orb2.type === 'empty') {
          const type = elements[Math.floor(Math.random() * 6)];
          orb1.type = type;
          grid[orb1.x][orb1.y].type = type;
          orb1.moveY = orbBuffer[x];
          orb1.speed = 0.34;
          orbBuffer[x] -= 1;
        } else {
          swapOrbs(orb1, orb2, 0.34);
        }
      }
    }
  }
};

const deselectOrb = entities => {
  entities.topScreen.moveStartTime = null;
  entities[selectedOrb].selected = false;
  entities[selectedOrb].top = null;
  entities[selectedOrb].left = null;
  selectedOrb = null;
};
const selectorb = (entities, orb) => {
  selectedOrb = orb;
  entities[selectedOrb].selected = true;
};
const GridLogic = (entities, {touches}) => {
  if (entities.topScreen.health === 0) return entities;
  entities.clock += 1;
  entities.topScreen.time = entities.gameStartTime
    ? new Date().getTime() - entities.gameStartTime
    : 0;
  if (entities.animationInProg || delayFrames > 0) {
    delayFrames = Math.max(0, delayFrames - 1);
    return entities;
  }
  if (
    selectedOrb &&
    orbsMoved &&
    entities.topScreen.time - entities.topScreen.moveStartTime >= 6000
  ) {
    deselectOrb(entities);
  }
  if (entities.newGame) {
    entities.newGame = false;
    initGrid(entities);
    entities.gameStartTime = new Date().getTime();
    console.log('Game initialized!');
  }
  if (delayFrames > 0) {
    console.log('DELAYING');
  }
  if (orbsMoved && !selectedOrb) {
    let matches = matchOrbs(entities);
    if (matches.length > 0) {
      entities.topScreen.combos += 1;
      entities.match = matches[0];
      removeMatchedOrbs(matches, entities);
    } else {
      if (entities.topScreen.combos > 0) {
        orbsMatched = true;
      } else {
        entities.topScreen.moves += 1;
      }
      orbsMoved = false;
    }
    return entities;
  }
  if (orbsMatched) {
    dropOrbs(entities);
    orbsMoved = matchOrbs(entities).length > 0;
    orbsMatched = false;
    if (!orbsMoved) {
      entities.evalPoints = true;
      entities.topScreen.moves += 1;
      entities.topScreen.totalCombos += entities.topScreen.combos;
    }
  }
  touches
    .filter(t => t.type === 'start')
    .forEach(t => {
      const orb = getOrbAtPixel(t.event.pageX, t.event.pageY, entities);
      //console.log({pressedOrb: orb});
      if (orb && entities[orb].type !== 'empty') {
        selectorb(entities, orb);
      }
    });
  touches
    .filter(t => t.type === 'end')
    .forEach(t => {
      if (selectedOrb) {
        deselectOrb(entities);
      }
    });
  touches
    .filter(t => t.type === 'move')
    .forEach(t => {
      if (selectedOrb) {
        const currentOrb = entities[selectedOrb];
        const x = boundX(t.event.pageX);
        const y = boundY(t.event.pageY);
        currentOrb.left = x - 0.5 * size;
        currentOrb.top = y - 0.5 * size;
        currentOrb.top = boundY(currentOrb.top);

        const orbNum = getOrbAtPixel(x, y, entities);
        const orb = entities[orbNum];
        if (orb && (orb.x != currentOrb.x || orb.y != currentOrb.y)) {
          if (entities.topScreen.moveStartTime === null)
            entities.topScreen.moveStartTime = entities.topScreen.time;
          entities.topScreen.combos = 0;
          swapOrbs(currentOrb, orb);
          orbsMoved = true;
        }
      }
    });
  return entities;
};

export default GridLogic;
