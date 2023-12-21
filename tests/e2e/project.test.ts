import app from "../../src/infrastructure/express/app";
import request from "supertest";
import { ProjectMapper } from "../../src/adapters/gateways/repositories/typeorm/projects/project-mapper";
import dataSource from "../../src/infrastructure/typeorm/connection";
import { v4 as uuid } from "uuid";

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("create", () => {
  const params = {
    id: "",
    name: "test",
    status: "active",
  };
  afterEach(async () => {
    await dataSource.transaction(async (manager) => {
      await manager.getRepository(ProjectMapper).clear();
    });
  });
  test("success", async () => {
    await request(app)
      .post("/projects")
      .send(params)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({
          name: params.name,
          status: params.status,
        });
      });
  });
  test("invalid status", async () => {
    await request(app)
      .post("/projects")
      .send({
        ...params,
        status: "invalid",
      })
      .then((result) => {
        expect(result.status).toBe(422);
        expect(result.body).toMatchObject({
          code: 422,
          type: "invalidStatus",
        });
      });
  });
});

describe("update", () => {
  const params = {
    id: uuid(),
    name: "test",
    status: "active",
  };
  beforeEach(async () => {
    await dataSource.transaction(async (manager) => {
      await manager.getRepository(ProjectMapper).save({
        ...params,
        status: 1,
      });
    });
  });
  afterEach(async () => {
    await dataSource.transaction(async (manager) => {
      await manager.getRepository(ProjectMapper).clear();
    });
  });
  test("success", async () => {
    await request(app)
      .put(`/projects/${params.id}`)
      .send(params)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject(params);
      });
  });
  test("invalid status", async () => {
    await request(app)
      .put(`/projects/${params.id}`)
      .send({
        ...params,
        status: "invalid",
      })
      .then((result) => {
        expect(result.status).toBe(422);
        expect(result.body).toMatchObject({
          code: 422,
          type: "invalidStatus",
        });
      });
  });
});
