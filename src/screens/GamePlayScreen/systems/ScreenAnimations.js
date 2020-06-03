import configs from '../game_config';

const {hpIndicatorDuration, hpBarDuration} = configs;

const ScreenAnimations = (entities, {touches}) => {
  //HEAL
  const {healIndicator} = entities;
  if (healIndicator.amount > 0) {
    if (healIndicator.frame < hpIndicatorDuration) {
      entities.healIndicator.frame += 1;
    } else {
      entities.healIndicator.amount = 0;
      entities.healIndicator.frame = 0;
    }
  }
  //Damage
  const {damageIndicator} = entities;
  if (damageIndicator.amount < 0) {
    if (damageIndicator.frame < hpIndicatorDuration) {
      entities.damageIndicator.frame += 1;
    } else {
      entities.damageIndicator.amount = 0;
      entities.damageIndicator.frame = 0;
    }
  }

  //HP Bar
  if (damageIndicator.amount < 0 || healIndicator.amount > 0) {
    entities.topScreen.hpFrame =
      entities.damageIndicator.frame > 0 && entities.healIndicator.frame > 0
        ? Math.min(entities.damageIndicator.frame, entities.healIndicator.frame)
        : entities.damageIndicator.frame > 0
        ? entities.damageIndicator.frame
        : entities.healIndicator.frame;
    entities.topScreen.hpDiff =
      entities.damageIndicator.frame > 0 && entities.healIndicator.frame > 0
        ? entities.damageIndicator.frame < entities.healIndicator.frame
          ? damageIndicator.amount
          : healIndicator.amount
        : entities.damageIndicator.frame > 0
        ? damageIndicator.amount
        : healIndicator.amount;
    if (entities.topScreen.hpFrame > hpBarDuration) {
      entities.topScreen.hpFrame = 0;
      entities.topScreen.hpDiff = 0;
    }
  } else {
    entities.topScreen.hpFrame = 0;
    entities.topScreen.hpDiff = 0;
  }

  return entities;
};

export default ScreenAnimations;
