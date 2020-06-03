const heal_per_orb = 7;
const points_per_orb = 3;
const combo_multiplier = 1.2;

const PointCalculator = (entities, {touches}) => {
  const {match, evalPoints} = entities;
  if (match) {
    const type = match[0].type;
    const length = match.length;

    if (type === 'heart') {
      entities.heal = entities.heal
        ? entities.heal + length * heal_per_orb
        : length * heal_per_orb;
    } else {
      entities.earnedPoints = entities.earnedPoints
        ? entities.earnedPoints + length * points_per_orb
        : points_per_orb * points_per_orb;
    }

    delete entities.match;
  }
  if (evalPoints && entities.topScreen.combos > 0) {
    const {heal, earnedPoints, topScreen} = entities;
    const {health, points, maxHealth, combos} = topScreen;

    const totalHeal = Math.round(
      (heal || 0) * Math.pow(combo_multiplier, combos - 1),
    );
    const totalPoints = Math.round(
      (earnedPoints || 0) * Math.pow(combo_multiplier, combos - 1),
    );

    if (totalHeal > 0 && maxHealth > health) {
      entities.healIndicator.amount = Math.min(totalHeal, maxHealth - health);
    }

    entities.topScreen.health = Math.min(maxHealth, health + totalHeal);
    entities.topScreen.points = totalPoints + points;

    delete entities.evalPoints;
    delete entities.earnedPoints;
    delete entities.heal;
  }
  return entities;
};

export default PointCalculator;
