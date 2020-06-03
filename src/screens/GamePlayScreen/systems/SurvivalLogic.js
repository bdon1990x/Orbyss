import configs from '../game_config';

let lastBleed = 0;
let lastLevelup = 0;

const SurvivalLogic = (entities, {touches}) => {
  const {time, level, health} = entities.topScreen;
  const {bleedRate, levelupRate} = entities;
  const secs = Math.round((time % 60000) / 1000);
  if (
    health > 0 &&
    secs > 0 &&
    lastLevelup !== secs &&
    secs % levelupRate === 0
  ) {
    entities.topScreen.level = Math.min(level + 1, 50);
    lastLevelup = secs;
  }
  if (health > 0 && secs > 0 && lastBleed !== secs && secs % bleedRate === 0) {
    entities.topScreen.health = Math.max(0, health - level);
    entities.damageIndicator.amount = Math.max(-1 * level, -1 * health);
    lastBleed = secs;
  }
  return entities;
};

export default SurvivalLogic;
