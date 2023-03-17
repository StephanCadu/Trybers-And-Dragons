import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  constructor(
    private _p1: Fighter,
    private _p2: Fighter,
  ) {
    super(_p1);
  }

  get p1(): Fighter { return this._p1; }

  get p2(): Fighter { return this._p2; }

  fight(): number {
    const round = (attacker: Fighter, defensor: Fighter): void => {
      attacker.attack(defensor);

      if (defensor.lifePoints !== -1) round(defensor, attacker);
    };

    round(this.p1, this.p2);

    return super.fight();
  }
}