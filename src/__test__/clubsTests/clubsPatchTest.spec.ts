import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  fakeId,
  mockedClubRegister,
  mockedUserLogin,
} from "../mocks";

describe("Test for PATCH method in /clubs/:id",() => {
    let connection: DataSource;
    let clubId: string

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => {
                connection = res;
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });
        
        await request(app).post("/users").send(mockedUserLogin);
        await request(app).post("/clubs").send(mockedClubRegister);
    });
    
    afterAll(async () => {
        await connection.destroy();
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
            
            const response = await request(app)
            .patch(`/clubs/${fakeId}`)
            .send(mockedClubRegister)
            .set("Authorization", `Bearer ${responseToken.body.token}`)
            
        expect(response.status).toBe(404);
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