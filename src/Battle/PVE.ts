import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

type Oponent = SimpleFighter | Fighter;

export default class PVE extends Battle {
  constructor(
    private _p1: Fighter,
    private _oponents: Oponent[],
  ) {
    super(_p1);
  }

  get p1(): Fighter { return this._p1; }

  get oponents(): Oponent[] { return this._oponents; }

  fight(): number {
    const round = (attacker: Oponent, defensor: Oponent): number => {
      attacker.attack(defensor);

      if (defensor.lifePoints !== -1) round(defensor, attacker);

      return attacker.lifePoints;
    };

    const results = this.oponents
      .reduce((acc: number[], op) => [...acc, round(this.p1, op)], []);
    
    return results.some((result) => result === -1) ? -1 : 1;
  }
}