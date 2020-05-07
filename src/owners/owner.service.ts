import { Injectable, HttpException } from '@nestjs/common';
import { Owners } from './database/owner.mock';
import { OwnedCats } from './interfaces/owner.interface';

import { Cat } from '../cats/interfaces/cat.interface';
import { CreateOwnerDTO, StateOwnerEnum } from './dto/create-owner.dto';
import { CreateCatDTO, StateEnum } from '../cats/dto/create-cat.dto';
import { UpdateCatDTO } from '../cats/dto/update-cat.dto';
import { UpdateOwnerDTO } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  getOwners(): Array<any> {
    return Owners;
  }

  getOwnerByID(ownerID: number): Record<string, any> {
    const owner = this.collectOwner(ownerID);
    if (!owner || ownerID == undefined) {
      throw new HttpException('Not Found', 404);
    }
    return owner;
  }

  getOwnerByName(ownerName: string): Record<string, any> {
    console.log(ownerName);
    const owner = Owners.find(
      owner => owner.name.toLowerCase() == ownerName.toLowerCase(),
    );
    if (!owner || ownerName == undefined) {
      throw new HttpException('Not Found this Owner name', 404);
    }
    return owner;
  }

  getCatInOwner(ownerID: number, catID: number): Record<string, any> {
    const owner = this.collectOwner(ownerID);
    if (!owner || ownerID == undefined) {
      throw new HttpException('Not Found this Owner ID', 404);
    } else {
      if (owner.cats == undefined) throw new HttpException('Bad request', 403);
      const cat = this.collectCat(owner.cats, catID);
      if (!cat || catID == undefined) {
        throw new HttpException('Not Found this Cat ID', 404);
      }
      return cat;
    }
  }

  addOwner(ownerNew: CreateOwnerDTO): any {
    const owner = this.collectOwner(ownerNew.id);
    if (!owner) {
      if (ownerNew.id != undefined) {
        if (!this.isStateOwnerEnumValid(ownerNew.state)) {
          throw new HttpException('State of Owner is not valid', 404);
        }
        ownerNew.state = StateOwnerEnum.added;
        ownerNew.cats = this.spliceCatHaveStateNotValid(ownerNew.cats);
        const ownerCreated: OwnedCats = {
          id: ownerNew.id,
          name: ownerNew.name,
          state: ownerNew.state,
          cats: ownerNew.cats,
        };
        Owners.push(ownerCreated);
        return ownerNew;
      }
    }
    throw new HttpException('Forbidden', 403);
  }

  addMultiCatsForOwner(ownerID: number, ownedCats: CreateCatDTO[]): any {
    if (ownerID == undefined) {
      throw new HttpException('Not Found this Owner ID', 404);
    }
    ownedCats = this.spliceCatHaveStateNotValid(ownedCats);
    if (ownedCats.length == 0) {
      throw new HttpException('New Cats state are not valid', 404);
    }
    const owner = this.collectOwner(ownerID);
    if (!owner) {
      throw new HttpException('Not Found this Owner ID', 404);
    }
    if (owner.cats == undefined) {
      owner.cats = ownedCats;
      return owner;
    } else {
      if (
        this.removeDuplicates(owner.cats, ownedCats) ==
        'New Cats are duplicated'
      ) {
        throw new HttpException('New Cats are duplicated', 404);
      } else {
        const isFilteredCatsDuplicate: Cat[] = this.removeDuplicates(
          owner.cats,
          ownedCats,
        );
        owner.state = StateOwnerEnum.added;
        owner.cats = isFilteredCatsDuplicate;
        return owner;
      }
    }
  }
  deleteOwner(ownerID: number): string {
    const ownerIndex = this.collectOwnerIndex(ownerID);
    if (ownerIndex == -1 || ownerID == undefined) {
      throw new HttpException('Not Found this Owner ID', 404);
    } else {
      Owners.splice(ownerIndex, 1);
      return 'Delete OK!!!';
    }
  }

  deleteMultiCatsOfOwner(
    ownerID: number,
    ownedCats: Array<{ id: number }>,
  ): string {
    if (ownedCats == undefined) {
      throw new HttpException('Not Found Cat ID', 404);
    }
    const owner = this.collectOwner(ownerID);
    if (!owner) {
      throw new HttpException('Not Found this Owner ID', 404);
    } else {
      if (
        this.removeCatsOfOwner(owner.cats, ownedCats) != 'Cats are not in Owner'
      ) {
        owner.cats = this.removeCatsOfOwner(owner.cats, ownedCats);
        const mess = 'Deleted Cats';
        return mess;
      } else {
        throw new HttpException('Cats are not in Owner', 404);
      }
    }
  }
  updateOwner(owner: UpdateOwnerDTO): any {
    if (owner.id == undefined) {
      throw new HttpException('Not Found this Owner ID', 404);
    }
    const ownerAvailable = this.collectOwner(owner.id);
    if (!ownerAvailable) {
      throw new HttpException('Not Found this Owner ID', 404);
    }
    if (!this.isStateOwnerEnumValid(owner.state)) {
      throw new HttpException('State of Owner is not valid', 404);
    }
    if (this.updateMultiCat(ownerAvailable.cats, owner.cats) == 'Not valid') {
      throw new HttpException('Cats are not valid', 404);
    }
    ownerAvailable.cats = this.updateMultiCat(ownerAvailable.cats, owner.cats);
    ownerAvailable.name = owner.name;
    ownerAvailable.state = StateOwnerEnum.updated;
    return ownerAvailable;
  }

  updateCatOfOwner(ownerID: number, cat: UpdateCatDTO): any {
    const owner = this.collectOwner(ownerID);
    if (!owner || ownerID == undefined || cat.id == undefined) {
      throw new HttpException('Not Found this Owner ID', 404);
    }
    if (owner.cats == undefined) {
      throw new HttpException('Bad Request', 400);
    }
    const catAvailable = this.collectCat(owner.cats, cat.id);
    if (!catAvailable) {
      throw new HttpException('Not Found this Cat', 404);
    }
    if (!this.isStateEnumValid(cat.state)) {
      throw new HttpException('State of Cat not valid', 404);
    }
    owner.state = StateOwnerEnum.updated;
    catAvailable.name = cat.name;
    catAvailable.state = StateEnum.updated;
    return owner;
  }

  updateMultiCatsOfOwner(
    ownerID: number,
    ownedCats: UpdateCatDTO[],
  ): Record<string, any> {
    const owner = this.collectOwner(ownerID);
    if (!owner || ownerID == undefined) {
      throw new HttpException('Not Found this Owner ID', 404);
    }
    if (owner.cats == undefined) throw new HttpException('Bad Request', 400);
    if (this.updateMultiCat(owner.cats, ownedCats) == 'Not valid') {
      throw new HttpException('New Array cats is not valid', 404);
    }
    owner.cats = this.updateMultiCat(owner.cats, ownedCats);
    owner.state = StateOwnerEnum.updated;
    return owner;
  }

  collectOwner(id: number): any {
    return Owners.find(owner => owner.id == id);
  }

  collectOwnerIndex(id: number): number {
    return Owners.findIndex(owner => owner.id == id);
  }

  collectCat(cats: Cat[], id: number): any {
    return cats.find(cat => cat.id == id);
  }

  collectCatIndex(cats: Cat[], id: number): number {
    return cats.findIndex(cat => cat.id == id);
  }

  removeDuplicates(cats: Cat[], newCats: Cat[]): any {
    const uniqueArray = [];
    const duplicatedArray = [];
    let mergeCats = [];
    mergeCats = mergeCats.concat(cats);
    for (const j in newCats) {
      mergeCats.push(newCats[j]);
    }
    for (const i in mergeCats) {
      const index = uniqueArray.findIndex(cat => cat.id == mergeCats[i].id);
      if (index == -1) {
        uniqueArray.push(cats[i]);
      } else {
        duplicatedArray.push(cats[i]);
      }
    }
    if (duplicatedArray.length >= newCats.length) {
      return 'New Cats are duplicated';
    } else {
      return uniqueArray;
    }
  }

  removeCatsOfOwner(cats: Cat[], catsDelete: Array<{ id: number }>): any {
    const catsNotAvailable = [];
    const catsFiltered = [];
    for (const i in catsDelete) {
      const index = cats.findIndex(cat => cat.id == catsDelete[i].id);
      if (index != -1 ) {
        catsFiltered.push(cats[i]);
      } else {
        catsNotAvailable.push(cats[i]);
      }
    }
    if (catsNotAvailable.length >= catsDelete.length) {
      return 'Cats are not in Owner';
    } else {
      return catsNotAvailable;
    }
  }

  isStateOwnerEnumValid(state: string): string {
    if (
      state == StateOwnerEnum.new ||
      state == StateOwnerEnum.added ||
      state == StateOwnerEnum.updated
    )
      return state;
  }

  isStateEnumValid(state: string): string {
    if (state == StateEnum.new || state == StateEnum.added) return state;
  }

  spliceCatHaveStateNotValid(cats: Cat[]): any {
    const filtered = [];
    for (const k in cats) {
      if (this.isStateEnumValid(cats[k].state)) {
        if (cats[k].id != undefined) {
          filtered.push(cats[k]);
        }
      }
    }
    return filtered;
  }

  updateMultiCat(cats: Cat[], catsUpdate: UpdateCatDTO[]): any {
    catsUpdate = this.spliceCatHaveStateNotValid(catsUpdate);
    const filtered = [];
    for (const i in catsUpdate) {
      const cat = cats.find(cat => cat.id == catsUpdate[i].id);
      if (cat) {
        cat.name = catsUpdate[i].name;
        cat.state = StateEnum.updated;
      } else {
        filtered.push(cat);
      }
    }
    if (filtered.length >= catsUpdate.length) {
      return 'Not valid';
    }
    return cats;
  }
}
