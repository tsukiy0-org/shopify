import { App } from "./App";
import dotenv from "dotenv-flow";
import ngrok from "ngrok";

dotenv.config();

void (async () => {
  const port = 8000;
  const url = await ngrok.connect(port);

  const app = App.build({
    hostUrl: new URL(url),
  });

  app.listen(port, () => {
    console.log(url);
  });
})();
