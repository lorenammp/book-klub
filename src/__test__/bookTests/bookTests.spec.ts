import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedBookRegister, mockedSecondBookRegister, mockedUserLogin } from "../mocks";

describe("Testing books routes", ()=>{
    let connection: DataSource;
    let bookId: string;
    
    beforeAll(async ()=>{
        await AppDataSource.initialize()
            .then((res)=>{
                connection = res;
            })
            .catch((err) =>{
                console.log("Error during Data Source initialization", err)
            });
        
        await request(app).post("/books").send(mockedBookRegister);
        await request(app).post("/books").send(mockedSecondBookRegister);
    })

    afterAll(async () => {
        await connection.destroy();
    });

    test("POST /books - Must be able to create a book", async ()=>{
        const userLoginResponse = await request(app)
        .post("/users/login")
        .send(mockedUserLogin);
        const response = await request(app)
        .post("/book")
        .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
        .send(mockedBookRegister);

        bookId = response.body.id;

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("author");
        expect(response.body).toHaveProperty("categoryId");
        expect(response.status).toBe(201);
    })
})