import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Necromancer extends Archetype {
  static instances = 0;

  constructor(
    name: string,
    public energyType: EnergyType = 'mana',
  ) {
    super(name);
    Necromancer.instances += 1;
  }

  static createdArchetypeInstances(): number { return Necromancer.instances; }
}