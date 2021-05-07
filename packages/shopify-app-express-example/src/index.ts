import { App } from "./App";
import dotenv from "dotenv-flow";

dotenv.config();

const app = App.build();

app.listen(8000, () => {
  console.log("listening on port 8000");
});
