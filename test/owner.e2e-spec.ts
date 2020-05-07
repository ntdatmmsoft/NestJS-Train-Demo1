import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { OwnerModule } from '../src/owners/owner.module';
import { OwnerService } from '../src/owners/owner.service';
import { Owners } from '../src/owners/database/owner.mock';
import {
  CreateOwnerDTO,
  StateOwnerEnum,
} from '../src/owners/dto/create-owner.dto';
import { CreateCatDTO, StateEnum } from '../src/cats/dto/create-cat.dto';
import { UpdateOwnerDTO } from '../src/owners/dto/update-owner.dto';
import { UpdateCatDTO } from '../src/cats/dto/update-cat.dto';

describe('Owner', () => {
  let app: INestApplication;
  let ownerService: OwnerService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OwnerModule],
      providers: [OwnerService],
    })
      .overrideProvider(OwnerService)
      .useValue(ownerService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET owners`, async () => {
    try {
      const result = Owners;
      const response = await request(app.getHttpServer())
        .get('/test2/owners/about')
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET owners error`, async () => {
    try {
      const result = 'Not Found';
      const response = await request(app.getHttpServer())
        .get('/test2/owners')
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
      expect(response.body.error).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET owners by ID`, async () => {
    try {
      const ownerID = 3;
      const result = Owners[2];
      const response = await request(app.getHttpServer())
        .get('/test2/owners/owner/' + ownerID)
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET owners by ID error miss ID`, async () => {
    try {
      const ownerID = undefined;
      const response = await request(app.getHttpServer())
        .get('/test2/owners/owner/' + ownerID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET owners by ID error ID not available`, async () => {
    try {
      const ownerID = 78;
      const response = await request(app.getHttpServer())
        .get('/test2/owners/owner/' + ownerID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET all cats of owners by ID`, async () => {
    try {
      const ownerID = 2;
      const result = Owners[1];
      const response = await request(app.getHttpServer())
        .get('/test2/owners/cats/' + ownerID)
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET all cats of owners by ID error miss ID`, async () => {
    try {
      const ownerID = undefined;
      const response = await request(app.getHttpServer())
        .get('/test2/owners/cats/' + ownerID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET all cats of owners by ID not available`, async () => {
    try {
      const ownerID = 78;
      const response = await request(app.getHttpServer())
        .get('/test2/owners/cats/' + ownerID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cat of owners by ID`, async () => {
    try {
      const ownerID = 2;
      const catID = 2;
      const result = Owners[1].cats[0];
      const response = await request(app.getHttpServer())
        .get('/test2/owners/cat?ownerID=' + ownerID + '&catID=' + catID)
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cat of owners by ID error miss ID owner`, async () => {
    try {
      const ownerID = undefined;
      const catID = 2;
      const response = await request(app.getHttpServer())
        .get('/test2/owners/cat?ownerID=' + ownerID + '&catID=' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cat of owners by ID error miss ID cat`, async () => {
    try {
      const ownerID = 2;
      const catID = undefined;
      const response = await request(app.getHttpServer())
        .get('/test2/owners/cat?ownerID=' + ownerID + '&catID=' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cat of owners by owner ID not available`, async () => {
    try {
      const ownerID = 14;
      const catID = 2;
      const response = await request(app.getHttpServer())
        .get('/test2/owners/cat?ownerID=' + ownerID + '&catID=' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cat of owners by cat ID not available`, async () => {
    try {
      const ownerID = 2;
      const catID = 9;
      const response = await request(app.getHttpServer())
        .get('/test2/owners/cat?ownerID=' + ownerID + '&catID=' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Post add owner`, async () => {
    try {
      const newOwner: CreateOwnerDTO = {
        id: 6,
        name: 'Boss 6',
        state: StateOwnerEnum.new,
      };
      const response = await request(app.getHttpServer())
        .post('/test2/owners/owner')
        .send(newOwner)
        .expect(201);
      expect(typeof response.body).toBe('object');
      expect(response.body.id).toBe(newOwner.id);
      expect(response.body.name).toBe(newOwner.name);
      expect(response.body.state).toBe(StateOwnerEnum.added);
    } catch (err) {
      throw err;
    }
  });

  it(`/Post add owner miss ID`, async () => {
    try {
      const newOwner: CreateOwnerDTO = {
        id: undefined,
        name: 'Boss 6',
      };
      const response = await request(app.getHttpServer())
        .post('/test2/owners/owner')
        .send(newOwner)
        .expect(403);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(403);
    } catch (err) {
      throw err;
    }
  });

  it(`/Post add owner available ID`, async () => {
    try {
      const newOwner: CreateOwnerDTO = {
        id: 1,
        name: 'Boss 1',
        state: StateOwnerEnum.new,
      };
      const response = await request(app.getHttpServer())
        .post('/test2/owners/owner')
        .send(newOwner)
        .expect(403);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(403);
    } catch (err) {
      throw err;
    }
  });

  // it(`/Post add cat for owner`, async () => {
  //   try {
  //     const ownerID = 5;
  //     const catNew: CreateCatDTO = {
  //       id: 8,
  //       name: 'Test 8',
  //       state: StateEnum.new,
  //     };
  //     const response = await request(app.getHttpServer())
  //       .post('/test2/owners/cat?ownerID=' + ownerID)
  //       .send(catNew)
  //       .expect(201);
  //     expect(typeof response.body).toBe('object');
  //     expect(response.body.cats[2].id).toBe(catNew.id);
  //     expect(response.body.cats[2].name).toBe(catNew.name);
  //     expect(response.body.cats[2].state).toBe(StateEnum.added);
  //   } catch (err) {
  //     throw err;
  //   }
  // });

  // it(`/Post add cat for miss ownerID`, async () => {
  //   try {
  //     const ownerID = undefined;
  //     const newOwner: CreateOwnerDTO = {
  //       id: 6,
  //       name: 'Boss 6',
  //     };
  //     const response = await request(app.getHttpServer())
  //       .post('/test2/owners/cat?ownerID=' + ownerID)
  //       .send(newOwner)
  //       .expect(404);
  //     expect(typeof response.body).toBe('object');
  //     expect(response.body.statusCode).toEqual(404);
  //   } catch (err) {
  //     throw err;
  //   }
  // });

  // it(`/Post add cat for owner available ownerID`, async () => {
  //   try {
  //     const ownerID = 1;
  //     const newOwner: CreateOwnerDTO = {
  //       id: 1,
  //       name: 'Boss 1',
  //       state: StateOwnerEnum.new,
  //     };
  //     const response = await request(app.getHttpServer())
  //       .post('/test2/owners/cat?ownerID=' + ownerID)
  //       .send(newOwner)
  //       .expect(403);
  //     expect(typeof response.body).toBe('object');
  //     expect(response.body.statusCode).toEqual(403);
  //   } catch (err) {
  //     throw err;
  //   }
  // });


  //***** Check if use single add cat */
  it(`/Post add multi cats for owner`, async () => {
    try {
      const ownerID = 5;
      const ownedCats: CreateOwnerDTO[] = [
        {
          id: 3,
          name: 'Pussy Cat',
        },
        {
          id: 5,
          name: 'Cat 5',
        },
        {
          id: 15,
          name: 'Test 15',
          state: StateOwnerEnum.new,
        },
      ];
      const response = await request(app.getHttpServer())
        .post('/test2/owners/cats?ownerID=' + ownerID)
        .send(ownedCats)
        .expect(201);
      expect(typeof response.body).toBe('object');
      expect(response.body.cats[2].id).toBe(ownedCats[2].id);
      expect(response.body.cats[2].name).toBe(ownedCats[2].name);
      expect(response.body.cats[2].state).toBe(ownedCats[2].state);
      expect(response.body.state).toBe(StateOwnerEnum.added);
    } catch (err) {
      throw err;
    }
  });

  it(`/Post add multi cats for owner miss ownerID`, async () => {
    try {
      const ownerID = undefined;
      const ownedCats: CreateOwnerDTO[] = [
        {
          id: 3,
          name: 'Pussy Cat',
        },
        {
          id: 5,
          name: 'Cat 5',
        },
        {
          id: 15,
          name: 'Test 15',
          state: StateOwnerEnum.new,
        },
      ];
      const response = await request(app.getHttpServer())
        .post('/test2/owners/cats?ownerID=' + ownerID)
        .send(ownedCats)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete owner`, async () => {
    try {
      const ownerID = 1;
      const result = 'Delete OK!!!';
      const response = await request(app.getHttpServer())
        .delete('/test2/owners/owner?ownerID=' + ownerID)
        .expect(200);
      expect(response.text).toBe(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete owner miss ID`, async () => {
    try {
      const ownerID = undefined;
      const response = await request(app.getHttpServer())
        .delete('/test2/owners/owner?ownerID=' + ownerID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete owner ID not available`, async () => {
    try {
      const ownerID = 17;
      const response = await request(app.getHttpServer())
        .delete('/test2/owners/owner?ownerID=' + ownerID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete cat of owner`, async () => {
    try {
      const ownerID = 5;
      const catID = 15;
      const result = 'Deleted Cat of Owner';
      const response = await request(app.getHttpServer())
        .delete('/test2/owners/cat?ownerID=' + ownerID + '&catID=' + catID)
        .expect(200);
      expect(response.text).toBe(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete cat of owner miss ownerID`, async () => {
    try {
      const ownerID = undefined;
      const catID = 15;
      const response = await request(app.getHttpServer())
        .delete('/test2/owners/cat?ownerID=' + ownerID + '&catID=' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete cat of owner catID not available`, async () => {
    try {
      const ownerID = 5;
      const catID = 15;
      const response = await request(app.getHttpServer())
        .delete('/test2/owners/cat?ownerID=' + ownerID + '&catID=' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  //--------------------------
  it(`/Delete delete multi cats of owner`, async () => {
    try {
      const ownerID = 5;
      const cats: Array<{ id: number }> = [
        {
          id: 5,
        },
        {
          id: 3,
        },
      ];
      const result = 'Deleted Cats';
      const response = await request(app.getHttpServer())
        .delete('/test2/owners/cats?ownerID=' + ownerID)
        .send(cats)
        .expect(200);
      expect(response.text).toBe(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete multi cats of owner miss ownerID`, async () => {
    try {
      const ownerID = undefined;
      const cats: Array<{ id: number }> = [
        {
          id: 5,
        },
        {
          id: 3,
        },
      ];
      const response = await request(app.getHttpServer())
        .delete('/test2/owners/cats?ownerID=' + ownerID)
        .send(cats)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update Owner`, async () => {
    try {
      const owner: UpdateOwnerDTO = {
        id: 2,
        name: 'Boss1222',
        state: StateOwnerEnum.new,
        cats: [
          { id: 4, name: 'Test 1', state: StateEnum.new },
          { id: 5, name: 'Test 5', state: StateEnum.new },
        ],
      };
      const response = await request(app.getHttpServer())
        .patch('/test2/owners/owner')
        .send(owner)
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body.id).toBe(owner.id);
      expect(response.body.name).toBe(owner.name);
      expect(response.body.state).toBe(StateOwnerEnum.updated);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update Owner miss ownerID`, async () => {
    try {
      const owner: UpdateOwnerDTO = { id: undefined, name: 'Boss 33' };
      const response = await request(app.getHttpServer())
        .patch('/test2/owners/owner')
        .send(owner)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update Owner ID not available`, async () => {
    try {
      const owner: UpdateOwnerDTO = { id: 9, name: 'Boss 33' };
      const response = await request(app.getHttpServer())
        .patch('/test2/owners/owner')
        .send(owner)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update Owner State not available`, async () => {
    try {
      const owner = { id: 1, name: 'Boss1', state: 'Test' };
      const response = await request(app.getHttpServer())
        .patch('/test2/owners/owner')
        .send(owner)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  // it(`/Patch update Cat of Owner`, async () => {
  //   try {
  //     const ownerID = 4;
  //     const cat: UpdateCatDTO = {
  //       id: 4,
  //       name: 'Boss 44',
  //       state: StateEnum.new,
  //     };
  //     const response = await request(app.getHttpServer())
  //       .patch('/test2/owners/cat?ownerID=' + ownerID)
  //       .send(cat)
  //       .expect(200);
  //     expect(typeof response.body).toBe('object');
  //     expect(response.body.cats[0].id).toBe(cat.id);
  //     expect(response.body.cats[0].name).toBe(cat.name);
  //     expect(response.body.cats[0].state).toBe(StateEnum.updated);
  //     expect(response.body.state).toBe(StateOwnerEnum.updated);
  //   } catch (err) {
  //     throw err;
  //   }
  // });

  // it(`/Patch update Cat of Owner miss catID`, async () => {
  //   try {
  //     const ownerID = 4;
  //     const cat: UpdateCatDTO = { id: undefined, name: 'Boss 44' };
  //     const response = await request(app.getHttpServer())
  //       .patch('/test2/owners/cat?ownerID=' + ownerID)
  //       .send(cat)
  //       .expect(404);
  //     expect(typeof response.body).toBe('object');
  //     expect(response.body.statusCode).toEqual(404);
  //   } catch (err) {
  //     throw err;
  //   }
  // });

  // it(`/Patch update Cat of Owner cat not available`, async () => {
  //   try {
  //     const ownerID = 4;
  //     const cat: UpdateCatDTO = { id: 8, name: 'Boss 44' };
  //     const response = await request(app.getHttpServer())
  //       .patch('/test2/owners/cat?ownerID=' + ownerID)
  //       .send(cat)
  //       .expect(404);
  //     expect(typeof response.body).toBe('object');
  //     expect(response.body.statusCode).toEqual(404);
  //   } catch (err) {
  //     throw err;
  //   }
  // });

  // it(`/Patch update Cat of Owner state not available`, async () => {
  //   try {
  //     const ownerID = 4;
  //     const cat = { id: 8, name: 'Boss 44', state: 'Test' };
  //     const response = await request(app.getHttpServer())
  //       .patch('/test2/owners/cat?ownerID=' + ownerID)
  //       .send(cat)
  //       .expect(404);
  //     expect(typeof response.body).toBe('object');
  //     expect(response.body.statusCode).toEqual(404);
  //   } catch (err) {
  //     throw err;
  //   }
  // });

  it(`/Patch update Multi Cats of Owner`, async () => {
    try {
      const ownerID = 4;
      const cats: UpdateCatDTO[] = [
        { id: 4, name: 'Cat 44', state: StateEnum.new },
        {
          id: 6,
          name: 'Cat 66',
          state: StateEnum.new,
        },
      ];
      const response = await request(app.getHttpServer())
        .patch('/test2/owners/cats?ownerID=' + ownerID)
        .send(cats)
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body.cats[0].name).toBe(cats[0].name);
      expect(response.body.cats[1].name).toBe(cats[1].name);
      expect(response.body.cats[0].state).toBe(StateEnum.updated);
      expect(response.body.cats[1].state).toBe(StateEnum.updated);
      expect(response.body.state).toBe(StateOwnerEnum.updated);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update Multi Cats of Owner not have ownerID`, async () => {
    try {
      const ownerID = undefined;
      const cats: UpdateCatDTO[] = [
        { id: 4, name: 'Cat 44' },
        {
          id: 6,
          name: 'Cat 66',
        },
      ];
      const response = await request(app.getHttpServer())
        .patch('/test2/owners/cats?ownerID=' + ownerID)
        .send(cats)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update Multi Cats of Owner not have bad request`, async () => {
    try {
      const ownerID = 3;
      const cats: UpdateCatDTO[] = undefined;
      const response = await request(app.getHttpServer())
        .patch('/test2/owners/cats?ownerID=' + ownerID)
        .send(cats)
        .expect(400);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(400);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update Multi Cats of Owner state is not valid`, async () => {
    try {
      const ownerID = 4;
      const cats = [
        { id: 4, name: 'Cat 44', state: StateEnum.new },
        {
          id: 6,
          name: 'Cat 66',
          state: 'Test',
        },
      ];
      const response = await request(app.getHttpServer())
        .patch('/test2/owners/cats?ownerID=' + ownerID)
        .send(cats)
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body.cats[0].name).toBe(cats[0].name);
      expect(response.body.cats[0].state).toBe(StateEnum.updated);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update Multi Cats of Owner new cats not valid`, async () => {
    try {
      const ownerID = 4;
      const cats = [
        { id: 12, name: 'Cat 12', state: StateEnum.new },
        {
          id: 13,
          name: 'Cat 13',
          state: StateEnum.new,
        },
      ];
      const response = await request(app.getHttpServer())
        .patch('/test2/owners/cats?ownerID=' + ownerID)
        .send(cats)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
