import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();
router.use("/v1.0", require("./api/v1/api"));

const port = 3000;

app.use("/api", router);
app.use(express.static("demos"));
app.listen(port, () => {
  console.info(`Application listening on port: ${port}`);
});
