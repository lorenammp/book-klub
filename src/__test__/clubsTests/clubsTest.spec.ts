import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  fakeId,
  mockedBookRegister,
  mockedCategoryRegister,
  mockedClubRegister,
  mockedSecondClubRegister,
  mockedSecondUserLogin,
  mockedSecondUserRegister,
  mockedUserLogin,
  mockedUserRegister,
  mockedWrongClubRegister,
} from "../mocks";

describe("Testing clubs routes", () => {
  let connection: DataSource;
  let clubId: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserRegister);
    await request(app).post("/users").send(mockedSecondUserRegister);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /clubs - Must be able to create a club", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .post("/clubs")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedClubRegister);

    clubId = response.body.id;

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("created_At");
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /clubs - Should not be able to create a club with a repeated name", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .post("/clubs")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedClubRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /clubs - Should not be able to create a club without authentication", async () => {
    const response = await request(app).post("/clubs").send(mockedClubRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /clubs - Should not be able to create a club with missing properties", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .post("/clubs")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedWrongClubRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /clubs/:id/entry - Should not be able to enter a club without authentication", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const response = await request(app).post(`/clubs/${clubId}/entry`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /clubs/:id/entry - Should be able to enter a club", async () => {
    const newClubUserResponse = await request(app)
      .post("/users/login")
      .send(mockedSecondUserLogin);
    const response = await request(app)
      .post(`/clubs/${clubId}/entry`)
      .set("Authorization", `Bearer ${newClubUserResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(201);
  });

  test("POST /clubs/:id/entry - Should not be able to enter a club with an invalid id", async () => {
    const newClubUserResponse = await request(app)
      .post("/users/login")
      .send(mockedSecondUserLogin);
    const response = await request(app)
      .post(`/clubs/${fakeId}/entry`)
      .set("Authorization", `Bearer ${newClubUserResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /clubs/:id/entry - Should not be able to enter a club twice with the same user", async () => {
    const newClubUserResponse = await request(app)
      .post("/users/login")
      .send(mockedSecondUserLogin);
    const club = await request(app)
      .post("/clubs")
      .set("Authorization", `Bearer ${newClubUserResponse.body.token}`)
      .send(mockedSecondClubRegister);
    const response = await request(app)
      .post(`/clubs/${club.body.id}/entry`)
      .set("Authorization", `Bearer ${newClubUserResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /clubs/:id/book - Should not be able to add a book to a club without authentication", async () => {
    const response = await request(app)
      .post(`/clubs/${clubId}/book`)
      .send(mockedBookRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /clubs/:id/book - Should be able to add a book to a club ", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const categoryId = await request(app)
      .post("/users/categories")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategoryRegister);

    mockedBookRegister.categoryId = categoryId.body.id;

    const response = await request(app)
      .post(`/clubs/${clubId}/book`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedBookRegister);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("author");
    expect(response.body).toHaveProperty("category");
    expect(response.status).toBe(200);
  });
});
