import { OwnerOfCat } from './interfaces/cat.interface';

export const Cats: Array<OwnerOfCat> = [
  {
    id: 1,
    name: 'Cat',
    state: 'New',
    owner: { id: 1, name: 'Boss 1', state: 'New' },
  },
  {
    id: 2,
    name: 'Pussy Cat',
    state: 'New',
    owner: { id: 2, name: 'Boss 2', state: 'New' },
  },
  {
    id: 3,
    name: 'Pitchy Cat',
    state: 'New',
    owner: { id: 5, name: 'Boss 5', state: 'New' },
  },
  {
    id: 4,
    name: 'Cat 4',
    state: 'New',
    owner: { id: 4, name: 'Boss 4', state: 'New' },
  },
  {
    id: 5,
    name: 'Cat 5',
    state: 'New',
    owner: { id: 5, name: 'Boss 5', state: 'New' },
  },
  {
    id: 6,
    name: 'Cat 6',
    state: 'New',
    owner: { id: 4, name: 'Boss 4', state: 'New' },
  },
  { id: 7, name: 'Cat 7', state: 'New', owner: undefined },
];
