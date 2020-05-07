import { Injectable, HttpException } from '@nestjs/common';
import { Cats } from './cats.mock';
import { OwnerOfCat } from './interfaces/cat.interface';
import { CreateCatDTO, StateEnum } from './dto/create-cat.dto';
import { UpdateCatDTO } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  getCats(): any {
    return Cats;
  }

  getCatByID(catID: number): Record<string, any> {
    if (catID == undefined) throw new HttpException('Not Found', 404);
    const cat = this.collectCat(catID);
    if (!cat) {
      throw new HttpException('Not Found', 404);
    }

    return cat;
  }

  getCatByName(catName: string): Record<string, any> {
    if (catName == undefined) throw new HttpException('Not Found', 404);
    const cat = Cats.find(
      cat => cat.name.toLowerCase() == catName.toLowerCase(),
    );
    if (!cat) {
      throw new HttpException('Not Found', 404);
    }
    return cat;
  }

  addCat(cat: CreateCatDTO): Record<string, any> {
    if (cat.id == undefined) {
      throw new HttpException('Not Found', 404);
    }
    const checkIDAvailable = this.collectCatIndex(cat.id);
    if (checkIDAvailable != -1) {
      throw new HttpException('ID is duplicated', 403);
    } else {
      if (!this.isStateEnumValid(cat.state)) {
        throw new HttpException('Not Found', 404);
      }
      cat.state = StateEnum.new;
      const catAddForCats: OwnerOfCat = {
        id: cat.id,
        name: cat.name,
        state: cat.state,
        owner: undefined,
      };
      Cats.push(catAddForCats);
    }
    return cat;
  }

  updateCat(catUpdate: UpdateCatDTO): Record<string, any> {
    const cat = this.collectCat(catUpdate.id);
    if (catUpdate.id == undefined || !cat) {
      throw new HttpException('Not Found', 404);
    }
    if (
      !this.isStateEnumValid(catUpdate.state)
    ) {
      throw new HttpException('Not Found', 404);
    }
    cat.name = catUpdate.name;
    cat.state = StateEnum.updated;
    return cat;
  }

  deleteCat(catID: number): string {
    const catIndex = Cats.findIndex(cat => cat.id == catID);
    if (catIndex == -1) {
      throw new HttpException('Not Found', 404);
    }
    Cats.splice(catIndex, 1);
    return 'Cat is deleted';
  }

  collectCat(catID: number): any {
    return Cats.find(cat => cat.id == catID);
  }

  collectCatIndex(catID: number): number {
    return Cats.findIndex(cat => cat.id == catID);
  }

  isStateEnumValid(state: string): string {
    if (
      state == StateEnum.new ||
      state == StateEnum.added ||
      state == StateEnum.updated
    )
      return state;
  }
}
