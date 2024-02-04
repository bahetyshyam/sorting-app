import { ElementItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

export function createRandomNumberArray(
  size: number = 20,
  upperLimit: number = 250,
): ElementItem[] {
  return Array.from({ length: size }, () => ({
    value: Math.floor(Math.random() * upperLimit),
    id: uuidv4(),
    color: 'gray',
  }));
}
