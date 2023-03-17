import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Mage extends Archetype {
  static instances = 0;

  constructor(
    name: string,
    public energyType: EnergyType = 'mana',
  ) {
    super(name);
    Mage.instances += 1;
  }

  static createdArchetypeInstances(): number { return Mage.instances; }
}