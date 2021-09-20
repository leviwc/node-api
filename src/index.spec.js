import request from "supertest";
import routes from "./components/routes.js";
import { readFile } from "./components/fileChanger.js";
const dataBaseFile = "./data/dataBase.json";

describe("Test My app server", () => {
  it("should add user", async () => {
    var newUser = {
      nome: "levi",
      genero: "masculino",
      email: "aa@g.com",
    };
    const res = await request(routes)
      .post("/createUser")
      .type("json")
      .send(newUser);
    newUser["id"] = 0;
    expect(res.body).toEqual({ id: 0 });
    expect(res.status).toEqual(200);
    let dataBase = await readFile(dataBaseFile);
    expect(dataBase["userList"][0]).toEqual(newUser);
  });
});
