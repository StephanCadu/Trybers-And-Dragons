import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Warrior extends Archetype {
  static instances = 0;

  constructor(
    name: string,
    public energyType: EnergyType = 'stamina',
  ) {
    super(name);
    Warrior.instances += 1;
  }

  static createdArchetypeInstances(): number { return Warrior.instances; }
}