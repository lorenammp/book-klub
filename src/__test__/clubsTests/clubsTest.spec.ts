import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  fakeId,
  mockedBook,
  mockedBookRegister,
  mockedCategoryRegister,
  mockedClubRegister,
  mockedMeetingRegister,
  mockedSecondBook,
  mockedSecondBookRegister,
  mockedSecondClubRegister,
  mockedSecondUserLogin,
  mockedSecondUserRegister,
  mockedUserLogin,
  mockedUserRegister,
  mockedWrongBook,
  mockedWrongClubRegister,
  mockedWrongMeetingRegister,
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

  test("POST /clubs - Should be able to create a club", async () => {
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
    expect(response.status).toBe(400);
  });

  test("POST /clubs/:id/book - Should not be able to add a book to a club without authentication", async () => {
    const response = await request(app)
      .post(`/clubs/${clubId}/book`)
      .send(mockedBookRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /clubs/:id/book - Should be able to add a book to a club", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const categoryId = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategoryRegister);

    mockedBookRegister.categoryId = categoryId.body.id;
    mockedSecondBookRegister.categoryId = categoryId.body.id;

    const bookId = await request(app)
      .post(`/books`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedBookRegister);

    mockedBook.bookId = bookId.body.id;

    const response = await request(app)
      .post(`/clubs/${clubId}/book`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedBook);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  test("POST /clubs/:id/book - Should not be able to add a book to a club with missing properties", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post(`/clubs/${clubId}/book`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedWrongBook);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /clubs/:id/book - Should not be able to add a book to a club with a wrong club id", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const bookId = await request(app)
      .post(`/books`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSecondBookRegister);

    mockedSecondBook.bookId = bookId.body.id;

    const response = await request(app)
      .post(`/clubs/${fakeId}/book`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSecondBook);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /clubs/:id/book - Should not be able to add a book to a club twice", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post(`/clubs/${clubId}/book`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedBook);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /clubs/:id/meetings - Should not be able to create a meeting without authentication", async () => {
    const response = await request(app)
      .post(`/clubs/${clubId}/meetings`)
      .send(mockedMeetingRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /clubs/:id/meetings - Should be able to create a meeting", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post(`/clubs/${clubId}/meetings`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedMeetingRegister);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("description");
    expect(response.status).toBe(201);
  });

  test("POST /clubs/:id/meetings - Should not be able to create a meeting with missing parameters", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post(`/clubs/${clubId}/meetings`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedWrongMeetingRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /clubs/:id/meetings - Should not be able to create a meeting with a wrong club id", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post(`/clubs/${fakeId}/meetings`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedMeetingRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /clubs/ - Should be able to list all clubs", async () => {
    const response = await request(app).get(`/clubs`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("isActive");
    expect(response.body[0]).toHaveProperty("created_At");
    expect(response.body[0].isActive).toEqual(true);
    expect(response.status).toBe(200);
  });

  test("GET /clubs/:id - Should be able to list a single club by it's id", async () => {
    const response = await request(app).get(`/clubs/${clubId}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("created_At");
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(200);
  });

  test("GET /clubs/:id - Should not be able to list a single club with a wrong id", async () => {
    const response = await request(app).get(`/clubs/${fakeId}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET /clubs/:id/users - Should not be able to list all club users without authentication", async () => {
    const response = await request(app).get(`/clubs/${clubId}/users`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /clubs/:id/users - Should be able to list all club users", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get(`/clubs/${clubId}/users`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty("users_id");
    expect(response.body[0]).toHaveProperty("users_name");
    expect(response.body[0]).toHaveProperty("users_email");
    expect(response.body[0]).toHaveProperty("users_isActive");
    expect(response.body[0]).toHaveProperty("users_isAdm");
    expect(response.body[0]).not.toHaveProperty("users_password");
    expect(response.status).toBe(200);
  });

  test("GET /clubs/:id/users - Should not be able to list all club users with a wrong id", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get(`/clubs/${fakeId}/users`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET /clubs/:id/meetings - Should be able to list all club meetings", async () => {
    const response = await request(app).get(`/clubs/${clubId}/meetings`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("date");
    expect(response.body[0]).toHaveProperty("hour");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.status).toBe(200);
  });

  test("GET /clubs/:id/meetings - Should not be able to list all club meetings with a wrong id", async () => {
    const response = await request(app).get(`/clubs/${fakeId}/meetings`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  
  test("PATCH/clubs/:id, shouldn't be able to update, without a token", async () => {
    const responseToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const clubs = await request(app).get("/clubs");

    clubId = clubs.body.id

    const res = await request(app)
      .patch(`/clubs/${clubId}`)
      .send(mockedClubRegister);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
});


test("PATCH/clubs/:id, Shouldn't be able to update, with a invalid id", async () => {
    const responseToken = await request(app)
        .post("/users/login")
        .send(mockedUserLogin)
     
        const club = await request(app).get(`/clubs/${fakeId}`);
        
        const response = await request(app)
        .patch(`/clubs/${fakeId}`)
        .send(mockedClubRegister)
        .set("Authorization", `Bearer ${responseToken.body.token}`)
        
    expect(club.status).toBe(404);
    expect(response.body).toHaveProperty("message");
});


test("PATCH/clubs/:id, Should be possible to update club", async () => {
    const responseToken = await request(app)
    .post("/users/login")
    .send(mockedUserLogin)
    await request(app).post("/clubs").send(mockedClubRegister);
    const response = await request(app).get("/clubs")
    
    const responsePatch = await request(app)
    .patch(`/clubs/${response.body[0].id}`)
    .send(mockedClubRegister)
    .set("Authorization", `Bearer ${responseToken.body.token}`);
    
    expect(responsePatch.status).toBe(200);
    expect(responsePatch.body).toHaveProperty("id");
    expect(responsePatch.body).toHaveProperty("name");
    expect(responsePatch.body).toHaveProperty("description");
});
});
