import { App } from "./App";
import dotenv from "dotenv-flow";

dotenv.config();

const app = App.build();

app.listen(9000, () => {
  console.log("started!");
});
