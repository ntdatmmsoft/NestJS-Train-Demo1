import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CatsModule } from '../src/cats/cats.module';
import { Cats } from '../src/cats/cats.mock';
import { CreateCatDTO, StateEnum } from '../src/cats/dto/create-cat.dto';
import { UpdateCatDTO } from '../src/cats/dto/update-cat.dto';
import { CatsService } from '../src/cats/cats.service';

describe('Cats', () => {
  let app: INestApplication;
  let catsService: CatsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule],
      providers: [CatsService],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, async () => {
    try {
      const result = Cats;
      const response = await request(app.getHttpServer())
        .get('/test2/cats/about')
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cats error`, async () => {
    try {
      const result = 'Not Found';
      const response = await request(app.getHttpServer())
        .get('/test2/cats')
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
      expect(response.body.error).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cat by ID`, async () => {
    try {
      const catID = 2;
      const result = Cats[1];
      const response = await request(app.getHttpServer())
        .get('/test2/cats/cat/' + catID)
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cats by ID  error undefined`, async () => {
    try {
      const catID = undefined;
      const response = await request(app.getHttpServer())
        .get('/test2/cats/cat/' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cats by ID  error not available`, async () => {
    try {
      const catID = 9;
      const response = await request(app.getHttpServer())
        .get('/test2/cats/cat/' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cat by name`, async () => {
    try {
      const catName = 'Cat 5';
      const result = Cats[4];
      const response = await request(app.getHttpServer())
        .get('/test2/cats/cat?catName=' + catName)
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cats by name  error undefined`, async () => {
    try {
      const catName = undefined;
      const result = 'Not Found';
      const response = await request(app.getHttpServer())
        .get('/test2/cats/cat' + catName)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
      expect(response.body.error).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/GET cats by name  error not available`, async () => {
    try {
      const catName = 'Test by DN';
      const response = await request(app.getHttpServer())
        .get('/test2/cats/cat' + catName)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
    } catch (err) {
      throw err;
    }
  });

  it(`/Post add cat`, async () => {
    try {
      const newCat: CreateCatDTO = { id: 8, name: 'Cat 8', state: StateEnum.new };
      const response = await request(app.getHttpServer())
        .post('/test2/cats')
        .send(newCat)
        .expect(201);
      expect(typeof response.body).toBe('object');
      expect(response.body.id).toBe(newCat.id);
      expect(response.body.name).toBe(newCat.name);
      expect(response.body.state).toBe(StateEnum.new);
    } catch (err) {
      throw err;
    }
  });

  it(`/Post add cat error miss ID`, async () => {
    try {
      const newCat = { name: 'Cat 8', state: StateEnum.new  };
      const result = 'Not Found';
      const response = await request(app.getHttpServer())
        .post('/test2/cats')
        .send(newCat)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
      expect(response.body.message).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/Post add cat error with ID available`, async () => {
    try {
      const newCat = { id: 2, name: 'Test by DN' };
      const result = 'ID is duplicated';
      const response = await request(app.getHttpServer())
        .post('/test2/cats')
        .send(newCat)
        .expect(403);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(403);
      expect(response.body.message).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update cat`, async () => {
    try {
      const catUpdate: UpdateCatDTO = {
        id: 3,
        name: 'Boss 33',
        state:StateEnum.new
      };
      const response = await request(app.getHttpServer())
        .patch('/test2/cats')
        .send(catUpdate)
        .expect(200);
      expect(typeof response.body).toBe('object');
      expect(response.body.id).toBe(catUpdate.id);
      expect(response.body.name).toBe(catUpdate.name);
      expect(response.body.state).toBe(StateEnum.updated);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update cat not found ID`, async () => {
    try {
      const catUpdate: UpdateCatDTO = {
        id: undefined,
        name: 'Boss 33',
      };
      const result = 'Not Found';
      const response = await request(app.getHttpServer())
        .patch('/test2/cats')
        .send(catUpdate)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
      expect(response.body.message).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/Patch update cat ID not available`, async () => {
    try {
      const catUpdate: UpdateCatDTO = {
        id: 12,
        name: 'Boss 33',
      };
      const result = 'Not Found';
      const response = await request(app.getHttpServer())
        .patch('/test2/cats')
        .send(catUpdate)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
      expect(response.body.message).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete cat`, async () => {
    try {
      const catID = 7;
      const result = 'Cat is deleted';
      const response = await request(app.getHttpServer())
        .delete('/test2/cats?catID=' + catID)
        .expect(200);
      expect(response.text).toBe(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete cat not found ID`, async () => {
    try {
      const catID = undefined;
      const result = 'Not Found';
      const response = await request(app.getHttpServer())
        .delete('/test2/cats?catID=' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
      expect(response.body.message).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  it(`/Delete delete cat ID not available`, async () => {
    try {
      const catID = 10;
      const result = 'Not Found';
      const response = await request(app.getHttpServer())
        .delete('/test2/cats?catID=' + catID)
        .expect(404);
      expect(typeof response.body).toBe('object');
      expect(response.body.statusCode).toEqual(404);
      expect(response.body.message).toEqual(result);
    } catch (err) {
      throw err;
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
