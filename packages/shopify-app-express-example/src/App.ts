import express, { Application } from "express";
import cors from "cors";
import { json } from "body-parser";

export class App {
  static build = (): Application => {
    const app = express();

    app.use(cors());
    app.use(
      json({
        verify: (req, res, buf) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (req as any).rawBody = buf.toString("utf-8");
        },
      }),
    );

    app.get("/health", (_, res) => {
      console.log("hello");
      res.status(200);
      res.end();
    });

    return app;
  };
}
