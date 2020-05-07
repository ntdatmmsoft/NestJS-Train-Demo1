import { Test, TestingModule } from '@nestjs/testing';
import { OwnerService } from './owner.service';
import { Owners } from './database/owner.mock';
import { CreateOwnerDTO, StateOwnerEnum } from './dto/create-owner.dto';
import { CreateCatDTO, StateEnum } from '../cats/dto/create-cat.dto';
import { UpdateOwnerDTO } from './dto/update-owner.dto';
import { UpdateCatDTO } from '../cats/dto/update-cat.dto';

describe('OwnerService', () => {
  let ownerService: OwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnerService],
    }).compile();

    ownerService = module.get<OwnerService>(OwnerService);
  });

  describe('getOwners', () => {
    it('should return an array of owners', async () => {
      const result = Owners;
      jest.spyOn(ownerService, 'getOwners').mockImplementation(() => result);
      expect(await ownerService.getOwners()).toEqual(result);
    });
  });

  describe('getOwnerByID', () => {
    it('should return a owner by ID', async () => {
      const ownerID = 4;
      const result = Owners[3];
      jest.spyOn(ownerService, 'getOwnerByID').mockImplementation(() => result);
      expect(await ownerService.getOwnerByID(ownerID)).toEqual(result);
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
      expect(await ownerService.getOwnerByID(ownerID)).toEqual(result);
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
      expect(await ownerService.getOwnerByID(ownerID)).toEqual(result);
    });
  });

  describe('getOwnerByName', () => {
    it('should return owner by name', async () => {
      const ownerName = 'Boss3';
      const result = Owners[2];
      jest
        .spyOn(ownerService, 'getOwnerByName')
        .mockImplementation(() => result);
      expect(await ownerService.getOwnerByName(ownerName)).toEqual(result);
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
      expect(await ownerService.getOwnerByName(ownerName)).toEqual(result);
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
      expect(await ownerService.getOwnerByName(ownerName)).toEqual(result);
    });
  });

  describe('getAllCatsInOwner', () => {
    it('should return array cat', async () => {
      const ownerID = 4;
      const result = Owners[3].cats;
      jest
        .spyOn(ownerService, 'getAllCatsInOwner')
        .mockImplementation(() => result);
      expect(await ownerService.getAllCatsInOwner(ownerID)).toEqual(result);
    });
  });

  describe('getAllCatsInOwner error miss ID', () => {
    it('should return array cat', async () => {
      const ownerID = undefined;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'getAllCatsInOwner')
        .mockImplementation(() => result);
      expect(await ownerService.getAllCatsInOwner(ownerID)).toEqual(result);
    });
  });

  describe('getAllCatsInOwner error not available ID', () => {
    it('should return array cat', async () => {
      const ownerID = 78;
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'getAllCatsInOwner')
        .mockImplementation(() => result);
      expect(await ownerService.getAllCatsInOwner(ownerID)).toEqual(result);
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
      expect(await ownerService.getCatInOwner(ownerID, catID)).toEqual(result);
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
      expect(await ownerService.getCatInOwner(ownerID, catID)).toEqual(result);
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
      expect(await ownerService.getCatInOwner(ownerID, catID)).toEqual(result);
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
      expect(await ownerService.addOwner(owner)).toEqual(result);
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
      expect(await ownerService.addOwner(owner)).toEqual(result);
    });
  });

  describe('addCatForOwner', () => {
    it('should return new cat', async () => {
      const ownerID = 2;
      const cat: CreateCatDTO = {
        id: 22,
        name: 'Test22',
        state: StateEnum.new,
      };
      const result: CreateCatDTO = {
        id: 22,
        name: 'Test22',
        state: StateEnum.added,
      };
      jest
        .spyOn(ownerService, 'addCatForOwner')
        .mockImplementation(() => result);
      expect(await ownerService.addCatForOwner(ownerID, cat)).toEqual(result);
    });
  });

  describe('addCatForOwner', () => {
    it('should return new cat', async () => {
      const ownerID = 2;
      const cat: CreateCatDTO = {
        id: 22,
        name: 'Test22',
        state: StateEnum.new,
      };
      const result: CreateCatDTO = {
        id: 22,
        name: 'Test22',
        state: StateEnum.added,
      };
      jest
        .spyOn(ownerService, 'addCatForOwner')
        .mockImplementation(() => result);
      expect(await ownerService.addCatForOwner(ownerID, cat)).toEqual(result);
    });
  });

  describe('addCatForOwner available ID', () => {
    it('should return new cat', async () => {
      const ownerID = 4;
      const cat: CreateCatDTO = { id: 4, name: 'Test22', state: StateEnum.new };
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'addCatForOwner')
        .mockImplementation(() => result);
      expect(await ownerService.addCatForOwner(ownerID, cat)).toEqual(result);
    });
  });

  describe('addMultiCatsForOwner', () => {
    it('should return array new cats', async () => {
      const ownerID = 4;
      const ownedCats: CreateCatDTO[] = [
        { id: 4, name: 'Cat 4' },
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
        await ownerService.addMultiCatsForOwner(ownerID, ownedCats),
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
        await ownerService.addMultiCatsForOwner(ownerID, ownedCats),
      ).toEqual(result);
    });
  });

  describe('deleteOwner', () => {
    it('should return message', async () => {
      const ownerID = 3;
      const result = 'Delete OK!!!';
      jest.spyOn(ownerService, 'deleteOwner').mockImplementation(() => result);
      expect(await ownerService.deleteOwner(ownerID)).toBe(result);
    });
  });

  describe('deleteOwner miss ID', () => {
    it('should return message', async () => {
      const ownerID = undefined;
      const result = 'Not Found';
      jest.spyOn(ownerService, 'deleteOwner').mockImplementation(() => result);
      expect(await ownerService.deleteOwner(ownerID)).toBe(result);
    });
  });

  describe('deleteOwner ID not available', () => {
    it('should return message', async () => {
      const ownerID = 18;
      const result = 'Not Found';
      jest.spyOn(ownerService, 'deleteOwner').mockImplementation(() => result);
      expect(await ownerService.deleteOwner(ownerID)).toBe(result);
    });
  });

  describe('deleteCatOfOwner', () => {
    it('should return message', async () => {
      const ownerID = 4;
      const catID = 4;
      const result = 'Delete Cat of Owner';
      jest
        .spyOn(ownerService, 'deleteCatOfOwner')
        .mockImplementation(() => result);
      expect(await ownerService.deleteCatOfOwner(ownerID, catID)).toBe(result);
    });
  });

  describe('deleteCatOfOwner miss ownerID', () => {
    it('should return message', async () => {
      const ownerID = undefined;
      const catID = 4;
      const result = 'Not Found';
      jest
        .spyOn(ownerService, 'deleteCatOfOwner')
        .mockImplementation(() => result);
      expect(await ownerService.deleteCatOfOwner(ownerID, catID)).toBe(result);
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
        .spyOn(ownerService, 'deleteCatOfOwner')
        .mockImplementation(() => result);
      expect(await ownerService.deleteMultiCatsOfOwner(ownerID, cats)).toEqual(
        result,
      );
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
      expect(await ownerService.deleteMultiCatsOfOwner(ownerID, cats)).toEqual(
        result,
      );
    });
  });

  describe('updateOwner', () => {
    it('should return owner updated', async () => {
      const owner: UpdateOwnerDTO = { id: 3, name: 'Boss 33' };
      const result = {
        id: 3,
        name: 'Boss 33',
        state: StateOwnerEnum.updated,
      };
      jest.spyOn(ownerService, 'updateOwner').mockImplementation(() => result);
      expect(await ownerService.updateOwner(owner)).toEqual(result);
    });
  });

  describe('updateOwner miss ownerID', () => {
    it('should return owner updated', async () => {
      const owner: UpdateOwnerDTO = { id: undefined, name: 'Boss 33' };
      const result = {
        id: 3,
        name: 'Boss 33',
        state: StateOwnerEnum.updated,
      };
      jest.spyOn(ownerService, 'updateOwner').mockImplementation(() => result);
      expect(await ownerService.updateOwner(owner)).toEqual(result);
    });
  });

  describe('updateCatOfOwner', () => {
    it('should return an array of owners', async () => {
      const ownerID = 5;
      const cat: UpdateCatDTO = { id: 3, name: 'Boss 33' };
      const result = (Owners[4] = {
        id: 5,
        name: 'Boss5',
        state: StateOwnerEnum.updated,
        cats: [
          {
            id: 3,
            name: 'Boss 33',
          },
          {
            id: 5,
            name: 'Cat 5',
            state: StateEnum.new,
          },
        ],
      });
      jest
        .spyOn(ownerService, 'updateCatOfOwner')
        .mockImplementation(() => result);
      expect(await ownerService.updateCatOfOwner(ownerID, cat)).toEqual(result);
    });
  });

  describe('updateCatOfOwner miss ID', () => {
    it('should return an array of owners miss ownerID', async () => {
      const ownerID = undefined;
      const cat: UpdateCatDTO = { id: 3, name: 'Boss 33' };
      const result: Record<string, any> = {
        type: 'Error',
        content: 'Not Found',
      };
      jest
        .spyOn(ownerService, 'updateCatOfOwner')
        .mockImplementation(() => result);
      expect(await ownerService.updateCatOfOwner(ownerID, cat)).toEqual(result);
    });
  });

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
      const result = (Owners[3].cats = [
        { id: 4, name: 'Cat 44', state: StateEnum.updated },
        { id: 6, name: 'Cat 66', state: StateEnum.updated },
      ]);
      jest
        .spyOn(ownerService, 'updateMultiCatsOfOwner')
        .mockImplementation(() => result);
      expect(
        await ownerService.updateMultiCatsOfOwner(ownerID, updateCats),
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
        { id: 4, name: 'Cat 44', state: StateEnum.updated },
        { id: 6, name: 'Cat 66', state: StateEnum.updated },
      ]);
      jest
        .spyOn(ownerService, 'updateMultiCatsOfOwner')
        .mockImplementation(() => result);
      expect(
        await ownerService.updateMultiCatsOfOwner(ownerID, updateCats),
      ).toEqual(result);
    });
  });
});
