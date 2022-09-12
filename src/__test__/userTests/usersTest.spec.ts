import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";

import {
  mockedUserRegister,
  mockedUserLogin,
  mockedWrongUserLogin,
  mockedSecondUserRegister,
  fakeId,
  mockedUpdatedUser,
} from "../mocks/index";
import { IUser } from "../../interfaces/users";

describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.log("Error during initialization ", err));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new user POST/users", async () => {
    const res = await request(app).post("/users").send(mockedUserRegister);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("isAdm");
    expect(res.body).toHaveProperty("isActive");
  });

  test("Shouldn't be able to create a new user, with an existing user POST/users", async () => {
    const res = await request(app).post("/users").send(mockedUserRegister);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
  });

  test("Should be able to Log In POST/users/login", async () => {
    const res = await request(app).post("/users/login").send(mockedUserLogin);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Shouldn't be able to Log In, wrong email or password POST/users/login", async () => {
    const res = await request(app)
      .post("/users/login")
      .send(mockedWrongUserLogin);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
  });

  test("Shouldn't be able to login, missing password POST/users/login", async () => {
    const { email } = mockedWrongUserLogin;
    const res = await request(app).post("/users/login").send(email);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
  });

  test("Should be able to list all users GET/users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("map");
  });

  test("Should be able to list an user, with token GET/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const Users = await request(app).get("/users");

    const res = await request(app)
      .get(`/users/${Users.body[0].id}`)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("isAdm");
    expect(res.body).toHaveProperty("isActive");
  });

  test("Shouldn't be able to list an user, with a wrong id GET/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const res = await request(app)
      .get(`/users/${fakeId}`)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
  });

  test("Shouldn't be able to list an user, without token GET/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const Users = await request(app).get("/users");

    const res = await request(app).get(`/users/${Users.body[0].id}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("Shouldn't be able to update an user, with an existent email PATCH/users/:id", async () => {
    await request(app).post("/users").send(mockedSecondUserRegister);
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const Users = await request(app).get("/users");

    const res = await request(app)
      .patch(`/users/${Users.body[0].id}`)
      .send(mockedSecondUserRegister)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  test("Shouldn't be able to update, without a token PATCH/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const Users = await request(app).get("/users");

    const res = await request(app)
      .patch(`/users/${Users.body[0].id}`)
      .send(mockedUpdatedUser);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("Shouldn't be able to update, with a invalid ID  PATCH/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const res = await request(app)
      .patch(`/users/${fakeId}`)
      .send(mockedUpdatedUser)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  test("Shouldn't be able to update an user if not a owner PATCH/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const Users = await request(app).get("/users");

    const res = await request(app)
      .patch(`/users/${Users.body[1].id}`)
      .send(mockedUpdatedUser)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  test("Shouldn't be able to update an user, fields that cannot be updated PATCH/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const Users = await request(app).get("/users");

    const newUser: IUser = {
      name: "Updated User",
      email: "updated@mail.com",
      isActive: true,
      isAdm: true,
      password: "12345",
    };

    const res = await request(app)
      .patch(`/users/${Users.body[0].id}`)
      .send(newUser)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  test("Should be able to update an user PATCH/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const Users = await request(app).get("/users");

    const res = await request(app)
      .patch(`/users/${Users.body[0].id}`)
      .send(mockedUpdatedUser)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", Users.body[0].id);
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("isAdm", Users.body[0].isAdm);
    expect(res.body).toHaveProperty("isActive", Users.body[0].isActive);
  });

  test("Should be able to delete an user DELETE/users/:id", async () => {
    const { name, ...user } = mockedUpdatedUser;
    const LoginUser = await request(app).post("/users/login").send(user);

    const Users = await request(app).get("/users");

    const res = await request(app)
      .delete(`/users/${Users.body[0].id}`)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(204);
  });

  test("Shouldn't be able to delete an user, without token DELETE/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedSecondUserRegister);

    const Users = await request(app).get("/users");

    const res = await request(app).delete(`/users/${Users.body[0].id}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("Shouldn't be able to delete an user, without wrong id DELETE/users/:id", async () => {
    const LoginUser = await request(app)
      .post("/users/login")
      .send(mockedSecondUserRegister);

    const res = await request(app)
      .delete(`/users/${fakeId}`)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });
});
