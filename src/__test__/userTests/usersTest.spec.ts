import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";

import { IUserLogin, IUserRequest } from "../../interfaces/users";

const newUser = {
  name: "Leo",
  email: "emailteste@mail.com",
  password: "123456",
  isAdm: true,
};

const SecondUser: IUserRequest = {
  name: "Usuario 2",
  email: "user2@mail.com",
  password: "123456",
};

const UserLogin: IUserLogin = {
  email: "emailteste@mail.com",
  password: "123456",
};

const SecondUserLogin: IUserLogin = {
  email: "user2@mail.com",
  password: "123456",
};

const WrongUserLogin: IUserLogin = {
  email: "emailteste@mail.com",
  password: "1234567",
};

const UpdatedUser: IUserRequest = {
  name: "Leoo",
  email: "email@email.com",
  password: "1234567",
};

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
    const res = await request(app).post("/users").send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("isAdm");
    expect(res.body).toHaveProperty("isActive");
  });

  test("Should be able to Log In POST/users/login", async () => {
    const res = await request(app).post("/users/login").send(UserLogin);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Shouldn't be able to login POST/users/login", async () => {
    const res = await request(app).post("/users/login").send(WrongUserLogin);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
  });

  test("Should be able to list all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("map");
  });

  test("Should be able to list an users GET/users", async () => {
    const LoginUser = await request(app).post("/users/login").send(UserLogin);
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

  test("Should be able to update an user PATCH/users/:id", async () => {
    const LoginUser = await request(app).post("/users/login").send(UserLogin);
    const Users = await request(app).get("/users");

    const res = await request(app)
      .patch(`/users/${Users.body[0].id}`)
      .send(UpdatedUser)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", Users.body[0].id);
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("isAdm", Users.body[0].isAdm);
    expect(res.body).toHaveProperty("isActive", Users.body[0].isActive);
  });

  test("Shouldn't be able to update an user if not a owner PATCH/users/:id", async () => {
    const LoginUser = await request(app).post("/users/login").send(UserLogin);

    await request(app).post("/users").send(SecondUser);

    const Users = await request(app).get("/users");

    const res = await request(app)
      .patch(`/users/${Users.body[1].id}`)
      .send(UpdatedUser)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("Should be able to delete an user", async () => {
    const { name, ...user } = UpdatedUser;
    const LoginUser = await request(app).post("/users/login").send(user);

    const Users = await request(app).get("/users");

    const res = await request(app)
      .delete(`/users/${Users.body[0].id}`)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(204);
  });

  test("Shouldn't be able to delete an user without adm ", async () => {
    const LoginUser = await request(app).post("/users/login").send(SecondUser);
    const Users = await request(app).get("/users");

    const res = await request(app)
      .delete(`/users/${Users.body[0].id}`)
      .set("Authorization", `Bearer ${LoginUser.body.token}`);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });
});
