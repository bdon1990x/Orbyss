import configs from '../game_config';

const {removeOrbDuration} = configs;

const OrbAnimations = (entities, {touches}) => {
  animationInProg = false;
  for (const e in entities) {
    if (!entities[e].type) continue;
    const orb = entities[e];

    //Move Orbs
    if (orb.moveX !== null && orb.moveX !== undefined) {
      const greater = orb.moveX > orb.x;
      orb.moveX += greater ? -1 * orb.speed : orb.speed;
      if (greater ? orb.moveX <= orb.x : orb.moveX >= orb.x) {
        orb.moveX = null;
      } else {
        animationInProg = true;
      }
    }
    if (orb.moveY !== null && orb.moveY !== undefined) {
      const greater = orb.moveY > orb.y;
      orb.moveY += greater ? -1 * orb.speed : orb.speed;
      if (greater ? orb.moveY <= orb.y : orb.moveY >= orb.y) {
        orb.moveY = null;
      } else {
        animationInProg = true;
      }
    }

    //Erase Orbs
    if (orb.emptyIn) {
      orb.emptyIn -= 1;
      if (orb.emptyIn === 0) {
        orb.type = 'empty';
        orb.opacity = null;
      } else {
        orb.opacity = orb.emptyIn / removeOrbDuration;
        animationInProg = true;
      }
    }
  }
  entities.animationInProg = animationInProg;
  return entities;
};

export default OrbAnimations;
