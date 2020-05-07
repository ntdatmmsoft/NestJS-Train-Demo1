import { Owner } from 'src/owners/interfaces/owner.interface';

export interface Cat {
  readonly id: number;
  name: string;
  state?: string;
}

export interface OwnerOfCat extends Cat {
  owner: Owner;
}
