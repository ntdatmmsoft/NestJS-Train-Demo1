import { OwnedCats } from '../interfaces/owner.interface';

export const Owners: Array<OwnedCats> = [
  {
    id: 1,
    name: 'Boss1',
    state: 'New',
    cats: [{ id: 1, name: 'Cat', state: 'New' }],
  },
  {
    id: 2,
    name: 'Boss2',
    state: 'New',
    cats: [{ id: 2, name: 'Pussy Cat', state: 'New' }],
  },
  { id: 3, name: 'Boss3', state: 'New', cats: undefined },
  {
    id: 4,
    name: 'Boss4',
    state: 'New',
    cats: [
      { id: 4, name: 'Cat 4', state: 'New' },
      { id: 6, name: 'Cat 6', state: 'New' },
    ],
  },
  {
    id: 5,
    name: 'Boss5',
    state: 'New',
    cats: [
      { id: 3, name: 'Pussy Cat', state: 'New' },
      { id: 5, name: 'Cat 5', state: 'New' },
    ],
  },
];
