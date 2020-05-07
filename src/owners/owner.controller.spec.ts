import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { CatsModule } from '../cats/cats.module';
import { Owners } from './database/owner.mock';
import { CreateOwnerDTO, StateOwnerEnum } from './dto/create-owner.dto';
import { CreateCatDTO, StateEnum } from '../cats/dto/create-cat.dto';
import { UpdateCatDTO } from '../cats/dto/update-cat.dto';

describe('Owner Controller', () => {
  let ownerController: OwnerController;
  let ownerService: OwnerService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
      controllers: [OwnerController],
      providers: [OwnerService],
    }).compile();
    ownerController = module.get<OwnerController>(OwnerController);
    ownerService = module.get<OwnerService>(OwnerService);
  });

  describe('getOwners', () => {
    it('should return an array of owners', async () => {
      const result = Owners;
      jest.spyOn(ownerService, 'getOwners').mockImplementation(() => result);
      expect(await ownerController.getOwners()).toEqual(result);
    });
  });

  describe('getOwnerByID', () => {
    it('should return a owner by ID', async () => {
      const ownerID = 4;
      const result = Owners[3];
      jest.spyOn(ownerService, 'getOwnerByID').mockImplementation(() => result);
      expect(await ownerController.getOwnerByID(ownerID)).toEqual(result);
    });
  });

  describe('getOwnerByID error miss ID', () => {
    it('should return error miss ID', async () => {
      const ownerID = undefined;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(ownerService, 'getOwnerByID').mockImplementation(() => result);
      expect(await ownerController.getOwnerByID(ownerID)).toEqual(result);
    });
  });

  describe('getOwnerByID error ID not available', () => {
    it('should return error ID available', async () => {
      const ownerID = 18;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(ownerService, 'getOwnerByID').mockImplementation(() => result);
      expect(await ownerController.getOwnerByID(ownerID)).toEqual(result);
    });
  });

  describe('getOwnerByName', () => {
    it('should return owner by name', async () => {
      const ownerName = 'Boss3';
      const result = Owners[2];
      jest
        .spyOn(ownerService, 'getOwnerByName')
        .mockImplementation(() => result);
      expect(await ownerController.getOwnerByName(ownerName)).toEqual(result);
    });
  });

  describe('getOwnerByName miss Name', () => {
    it('should return owner by name', async () => {
      const ownerName = undefined;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'getOwnerByName')
        .mockImplementation(() => result);
      expect(await ownerController.getOwnerByName(ownerName)).toEqual(result);
    });
  });

  describe('getOwnerByName Name not available', () => {
    it('should return owner by name', async () => {
      const ownerName = 'Test by DN';
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'getOwnerByName')
        .mockImplementation(() => result);
      expect(await ownerController.getOwnerByName(ownerName)).toEqual(result);
    });
  });

  describe('getCatInOwner', () => {
    it('should return cat by ID', async () => {
      const catID = 4;
      const ownerID = 4;
      const result = Owners[3].cats;
      jest
        .spyOn(ownerService, 'getCatInOwner')
        .mockImplementation(() => result);
      expect(await ownerController.getCatInOwner(ownerID, catID)).toEqual(
        result,
      );
    });
  });

  describe('getCatInOwner miss ownerID', () => {
    it('should return cat by ID', async () => {
      const catID = 4;
      const ownerID = undefined;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'getCatInOwner')
        .mockImplementation(() => result);
      expect(await ownerController.getCatInOwner(ownerID, catID)).toEqual(
        result,
      );
    });
  });

  describe('getCatInOwner ID not available', () => {
    it('should return cat by ID', async () => {
      const catID = 14;
      const ownerID = 4;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'getCatInOwner')
        .mockImplementation(() => result);
      expect(await ownerController.getCatInOwner(ownerID, catID)).toEqual(
        result,
      );
    });
  });

  describe('addOwner', () => {
    it('should return new owner', async () => {
      const owner: CreateOwnerDTO = {
        id: 6,
        name: 'Boss 6',
      };
      const result = {
        id: 6,
        name: 'Boss 6',
        state: StateOwnerEnum.added,
      };
      jest.spyOn(ownerService, 'addOwner').mockImplementation(() => result);
      expect(await ownerController.addOwner(owner)).toEqual(result);
    });
  });

  describe('addOwner miss ID', () => {
    it('should return new owner', async () => {
      const owner: CreateOwnerDTO = {
        id: undefined,
        name: 'Boss 6',
      };
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(ownerService, 'addOwner').mockImplementation(() => result);
      expect(await ownerController.addOwner(owner)).toEqual(result);
    });
  });

  describe('addOwner available ID', () => {
    it('should return new owner', async () => {
      const owner: CreateOwnerDTO = {
        id: 1,
        name: 'Boss 6',
      };
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest.spyOn(ownerService, 'addOwner').mockImplementation(() => result);
      expect(await ownerController.addOwner(owner)).toEqual(result);
    });
  });

  //-----
  describe('addMultiCatsForOwner', () => {
    it('should return array new cats', async () => {
      const ownerID = 4;
      const ownedCats: CreateCatDTO[] = [
        { id: 4, name: 'Cat 4', state: StateEnum.new },
        {
          id: 15,
          name: 'Cat 15',
          state: StateEnum.new,
        },
      ];
      const result = Owners[3];
      jest
        .spyOn(ownerService, 'addMultiCatsForOwner')
        .mockImplementation(() => result);
      expect(
        await ownerController.addMultiCatsForOwner(ownerID, ownedCats),
      ).toEqual(result);
    });
  });

  describe('addMultiCatsForOwner miss ownerID', () => {
    it('should return array new cats', async () => {
      const ownerID = undefined;
      const ownedCats: CreateCatDTO[] = [
        { id: 4, name: 'Cat 4', state: StateEnum.new },
        {
          id: 15,
          name: 'Cat 15',
          state: StateEnum.new,
        },
      ];
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'addMultiCatsForOwner')
        .mockImplementation(() => result);
      expect(
        await ownerController.addMultiCatsForOwner(ownerID, ownedCats),
      ).toEqual(result);
    });
  });

  describe('deleteOwner', () => {
    it('should return message', async () => {
      const ownerID = 3;
      const result = 'Delete OK!!!';
      jest.spyOn(ownerService, 'deleteOwner').mockImplementation(() => result);
      expect(await ownerController.deleteOwner(ownerID)).toBe(result);
    });
  });

  describe('deleteOwner miss ID', () => {
    it('should return message', async () => {
      const ownerID = undefined;
      const result = 'Not Found';
      jest.spyOn(ownerService, 'deleteOwner').mockImplementation(() => result);
      expect(await ownerController.deleteOwner(ownerID)).toBe(result);
    });
  });

  describe('deleteOwner ID not available', () => {
    it('should return message', async () => {
      const ownerID = 18;
      const result = 'Not Found';
      jest.spyOn(ownerService, 'deleteOwner').mockImplementation(() => result);
      expect(await ownerController.deleteOwner(ownerID)).toBe(result);
    });
  });

  describe('deleteMultiCatsOfOwner', () => {
    it('should return message', async () => {
      const ownerID = 5;
      const cats: Array<{ id: number }> = [
        {
          id: 5,
        },
        {
          id: 8,
        },
      ];
      const result = 'Deleted Cats';
      jest
        .spyOn(ownerService, 'deleteMultiCatsOfOwner')
        .mockImplementation(() => result);
      expect(
        await ownerController.deleteMultiCatsOfOwner(ownerID, cats),
      ).toEqual(result);
    });
  });

  describe('deleteMultiCatsOfOwner miss ownerID', () => {
    it('should return message', async () => {
      const ownerID = undefined;
      const cats: Array<{ id: number }> = [
        {
          id: 5,
        },
        {
          id: 8,
        },
      ];
      const result = 'Not Found';
      jest
        .spyOn(ownerService, 'deleteMultiCatsOfOwner')
        .mockImplementation(() => result);
      expect(
        await ownerController.deleteMultiCatsOfOwner(ownerID, cats),
      ).toEqual(result);
    });
  });

  //

  describe('updateMultiCatsOfOwner', () => {
    it('should return an array of owners', async () => {
      const ownerID = 4;
      const updateCats: UpdateCatDTO[] = [
        { id: 4, name: 'Cat 44' },
        {
          id: 6,
          name: 'Cat 66',
        },
      ];
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'updateMultiCatsOfOwner')
        .mockImplementation(() => result);
      expect(
        await ownerController.updateMultiCatsOfOwner(ownerID, updateCats),
      ).toEqual(result);
    });
  });

  describe('updateMultiCatsOfOwner miss ownerID', () => {
    it('should return an array of owners', async () => {
      const ownerID = undefined;
      const updateCats: UpdateCatDTO[] = [
        { id: 4, name: 'Cat 44' },
        {
          id: 6,
          name: 'Cat 66',
        },
      ];
      const result = (Owners[3].cats = [
        { id: 4, name: 'Cat 44', state: StateOwnerEnum.updated },
        { id: 6, name: 'Cat 66', state: StateOwnerEnum.updated },
      ]);
      jest
        .spyOn(ownerService, 'updateMultiCatsOfOwner')
        .mockImplementation(() => result);
      expect(
        await ownerController.updateMultiCatsOfOwner(ownerID, updateCats),
      ).toEqual(result);
    });
  });
});
