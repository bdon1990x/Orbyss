import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

const cols = 6;
const rows = 5;
const size = (window.width * 0.9) / cols;
const top_offset = window.height - size * rows - 50;
const left_offset = window.width * 0.05;

export default {
  cols,
  rows,
  size,
  top_offset,
  left_offset,
  windowWidth: window.width,
  windowHeight: window.height,
  removeOrbDuration: 5,
  hpIndicatorDuration: 15,
  hpBarDuration: 5,
};
