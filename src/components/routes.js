import express from "express";
import validation from "./validation.js";
import { readFile, writeFile } from "./fileChanger.js";
const routes = express.Router();
routes.use(express.json());
export default routes;
const dataBaseFile = "./data/dataBase.json";

routes.get("/", async (req, res) => {
  let dataBase = await readFile(dataBaseFile);
  return res.json(dataBase);
});

routes.post("/createUser", async (req, res) => {
  let validator = validation.validateCreateUser.validate(req.body);
  if (validator.error) return res.status(400).json(validator.error.details);
  let newUser = req.body;
  let newDataBase = await readFile(dataBaseFile);
  newUser["id"] = newDataBase.id++;
  newDataBase.userList.push(newUser);
  writeFile(dataBaseFile, JSON.stringify(newDataBase));
  return res.json(newUser);
});

routes.post("/addToLine", async (req, res) => {
  let validator = validation.validateAddToLine.validate(req.body);
  if (validator.error) return res.status(400).json(validator.error.details);
  let id = req.body.id;
  let newDataBase = await readFile(dataBaseFile);
  let userPos = newDataBase.userList.findIndex((item) => {
    return item["id"] === id;
  });
  if (userPos == -1) return res.status(400).json("User not found");
  newDataBase.queue.push(newDataBase.userList[userPos]);
  writeFile(dataBaseFile, JSON.stringify(newDataBase));
  return res.json(newDataBase.queue.length);
});

routes.post("/findPosition", async (req, res) => {
  let validator = validation.validateFindPosition.validate(req.body);
  if (validator.error) return res.status(400).json(validator.error.details);
  let email = req.body.email;
  let dataBase = await readFile(dataBaseFile);
  let userPos = dataBase.queue.findIndex((item) => {
    return item["email"] === email;
  });
  if (userPos == -1) return res.status(400).json("User not found");
  return res.json({ posição: userPos + 1 });
});

routes.post("/showLine", async (req, res) => {
  let pos = 1;
  let dataBase = await readFile(dataBaseFile);
  let displayQueue = dataBase.queue.map((item) => {
    delete item.id;
    item["posição"] = pos++;
    return item;
  });
  return res.json(displayQueue);
});

routes.post("/filterLine", async (req, res) => {
  let validator = validation.validateFilterLine.validate(req.body);
  if (validator.error) return res.status(400).json(validator.error.details);
  let genero = req.body.genero;
  let pos = 1;
  let dataBase = await readFile(dataBaseFile);
  let filteredQueue = dataBase.queue.map((item) => {
    delete item.id;
    item["posição"] = pos++;
    return item;
  });
  filteredQueue = filteredQueue.filter((item) => {
    return item.genero === genero;
  });
  return res.json(filteredQueue);
});

routes.post("/popLine", async (req, res) => {
  let newDataBase = await readFile(dataBaseFile);
  let frontQueue = newDataBase.queue.shift();
  writeFile(dataBaseFile, JSON.stringify(newDataBase));
  return res.json(frontQueue);
});
