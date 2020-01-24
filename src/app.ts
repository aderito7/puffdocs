import express from "express";

const router = express.Router();
router.use("/v1.0", require("./api/v1/api"));

express()
  .use("/api", router)
  .listen(3000, (port: number, hostname: string) => {
    console.info(`Application running on: ${hostname}:${port}`);
  });
