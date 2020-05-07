import { Cat } from "../../cats/interfaces/cat.interface";


export interface Owner {
  readonly id: number;
  name: string;
  state?: string;
}

export interface OwnedCats extends Owner {
  cats: Array<Cat>;
}
