import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import sessions from "./routes/sessions";

const app = new Hono();

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        err: err.message || "Request Failed",
      },
      err.status,
    );
  }

  console.error("Unhandled error:", err);

  return c.json(
    {
      err: "Internal Server Error",
    },
    500,
  );
});

const routes = app.route("/sessions", sessions);

export type AppType = typeof routes;

export default {
  port: 3000,
  fetch: app.fetch,
  idleTimeout: 255,
};
