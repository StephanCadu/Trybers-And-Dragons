import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _dexterity: number;
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _energy: Energy;
  private _name: string;
  
  constructor(name: string) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._race.maxLifePoints / 2;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = { 
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get lifePoints(): number { return this._lifePoints; }
  get dexterity(): number { return this._dexterity; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get energy(): Energy { return { ...this._energy }; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }
  
  get maxLifePoints(): number { return this._maxLifePoints; }
  set maxLifePoints(value: number) { this._maxLifePoints = value; }
  
  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this.strength);
  }

  levelUp(): void {
    const newLifePoints = this.maxLifePoints + getRandomInt(1, 10);
    this.maxLifePoints = newLifePoints > this.race.maxLifePoints 
      ? this.race.maxLifePoints : newLifePoints;
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    this._lifePoints = this.maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this.defense;
    if (damage > 0) this._lifePoints -= damage;
    else {
      this._lifePoints -= 1;
    }

    if (this.lifePoints <= 0) this._lifePoints = -1;
    return this.lifePoints;
  }
}