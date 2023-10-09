import app from "../../src/infrastructure/express/app";
import request from "supertest";
import { ProjectMapper } from "../../src/adapters/gateways/repositories/typeorm/projects/project-mapper";
import dataSource from "../../src/infrastructure/typeorm/connection";

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("create", () => {
  afterEach(async () => {
    await dataSource.transaction(async (manager) => {
      await manager.getRepository(ProjectMapper).clear();
    });
  });
  test("success", async () => {
    await request(app)
      .post("/projects")
      .send({
        name: "test",
        status: "active",
      })
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({
          name: "test",
          status: "active",
        });
      });
  });
  test("invalid status", async () => {
    await request(app)
      .post("/projects")
      .send({
        name: "test",
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
