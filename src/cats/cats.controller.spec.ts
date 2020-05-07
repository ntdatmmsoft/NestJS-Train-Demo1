import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats } from './cats.mock';
import { CreateCatDTO, StateEnum } from './dto/create-cat.dto';
import { UpdateCatDTO } from './dto/update-cat.dto';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();
    catsController = module.get<CatsController>(CatsController);
    catsService = module.get<CatsService>(CatsService);
  });

  describe('getCats', () => {
    it('should return all cats', async () => {
      const result = Cats;
      jest.spyOn(catsService, 'getCats').mockImplementation(() => result);
      expect(await catsController.getCats()).toEqual(result);
    });
  });

  describe('getCatByID', () => {
    it('should return cat by ID', async () => {
      const catID = 2;
      const result = Cats[1];
      jest.spyOn(catsService, 'getCatByID').mockImplementation(() => result);
      expect(await catsController.getCatByID(catID)).toEqual(result);
    });
  });

  describe('getCatByID error undefined', () => {
    it('should return cat error by ID', async () => {
      const catID = undefined;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(catsService, 'getCatByID').mockImplementation(() => result);
      expect(await catsController.getCatByID(catID)).toEqual(result);
    });
  });

  describe('getCatByID error not available', () => {
    it('should return cat error by ID', async () => {
      const catID = 9;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(catsService, 'getCatByID').mockImplementation(() => result);
      expect(await catsController.getCatByID(catID)).toEqual(result);
    });
  });

  describe('getCatByName', () => {
    it('should return cat by Name', async () => {
      const catName = 'Cat 6';
      const result = Cats[5];
      jest.spyOn(catsService, 'getCatByName').mockImplementation(() => result);
      expect(catsController.getCatByName(catName)).toEqual(result);
    });
  });

  describe('getCatByName error undefined', () => {
    it('should return error by Name', async () => {
      const catName = undefined;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(catsService, 'getCatByName').mockImplementation(() => result);
      expect(await catsController.getCatByName(catName)).toEqual(result);
    });
  });

  describe('getCatByName error not available', () => {
    it('should return error cat by Name', async () => {
      const catName = 'Test by DN';
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(catsService, 'getCatByName').mockImplementation(() => result);
      expect(await catsController.getCatByName(catName)).toEqual(result);
    });
  });

  describe('addCat', () => {
    it('should return state of cats', async () => {
      const cat: CreateCatDTO = {
        id: 12,
        name: 'Test12',
        state: StateEnum.new,
      };
      const result = {
        id: 12,
        name: 'Test12',
        state: StateEnum.added,
      };
      jest.spyOn(catsService, 'addCat').mockImplementation(() => result);
      expect(await catsController.addCat(cat)).toEqual(result);
    });
  });

  describe('addCat Error miss ID', () => {
    it('should return error miss ID', async () => {
      const cat: CreateCatDTO = {
        id: undefined,
        name: 'Test12',
        state: StateEnum.new,
      };
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(catsService, 'addCat').mockImplementation(() => result);
      expect(await catsController.addCat(cat)).toEqual(result);
    });
  });

  describe('addCat Error available ID', () => {
    it('should return error available ID', async () => {
      const cat: CreateCatDTO = {
        id: 1,
        name: 'Test12',
        state: StateEnum.new,
      };
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(catsService, 'addCat').mockImplementation(() => result);
      expect(await catsController.addCat(cat)).toEqual(result);
    });
  });

  describe('updateCat', () => {
    it('should return state of cats', async () => {
      const catUpdate: UpdateCatDTO = {
        id: 3,
        name: 'Boss 33',
      };
      const result = { id: 3, name: 'Boss 33', state: StateEnum.updated };
      jest.spyOn(catsService, 'updateCat').mockImplementation(() => result);
      expect(await catsController.updateCat(catUpdate)).toEqual(result);
    });
  });

  describe('updateCat Error miss ID', () => {
    it('should return error', async () => {
      const catUpdate: UpdateCatDTO = {
        id: undefined,
        name: 'Boss 33',
      };
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(catsService, 'updateCat').mockImplementation(() => result);
      expect(await catsController.updateCat(catUpdate)).toEqual(result);
    });
  });

  describe('updateCat Error not available ID', () => {
    it('should return error', async () => {
      const catUpdate: UpdateCatDTO = {
        id: 12,
        name: 'Boss 33',
      };
      const result: Record<string, any> = {
        type: 'Error',
        string: 'Not Found',
      };
      jest.spyOn(catsService, 'updateCat').mockImplementation(() => result);
      expect(await catsController.updateCat(catUpdate)).toEqual(result);
    });
  });

  describe('deleteCat', () => {
    it('should return message', async () => {
      const catID = 3;
      const result = 'Cat is deleted';
      jest.spyOn(catsService, 'deleteCat').mockImplementation(() => result);
      expect(await catsController.deleteCat(catID)).toBe(result);
    });
  });

  describe('deleteCat miss ID', () => {
    it('should return message error', async () => {
      const catID = undefined;
      const result = 'Not Found';
      jest.spyOn(catsService, 'deleteCat').mockImplementation(() => result);
      expect(await catsController.deleteCat(catID)).toBe(result);
    });
  });

  describe('deleteCat ID not available', () => {
    it('should return message error', async () => {
      const catID = 13;
      const result = 'Not Found';
      jest.spyOn(catsService, 'deleteCat').mockImplementation(() => result);
      expect(await catsController.deleteCat(catID)).toBe(result);
    });
  });
});
