import express from "express";
import routes from "./components/routes.js";

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3000, "0.0.0.0", () => {
  console.log("Express hosted at  http://localhost:3000");
});

export default app;
