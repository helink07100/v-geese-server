import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../../src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';

describe('User - /user (e2e)', () => {
  const user = {
    id: 1,
    firstName: 'FirstName #1',
    lastName: 'LastName #1',
    isActive: true,
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: '127.0.0.1',
          port: 3307,
          username: 'root',
          password: 'root',
          database: 'test',
          autoLoadEntities: true,
          synchronize: true,
        }),
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /user]', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send(user as CreateUserDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(user);
      });
  });

  it('Get all user [GET /user]', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one user [GET /user/:id]', () => {
    return request(app.getHttpServer())
      .get('/user/2')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Delete one user [DELETE /user/:id]', () => {
    return request(app.getHttpServer()).delete('/user/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
