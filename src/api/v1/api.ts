import express from "express";
import fs from "fs";
import { PdfGenerator } from "./services";

var router = express.Router();

router.use("/demos", require("./routes/demos"));

router.get("/", (request, response, next) => {
  PdfGenerator.instance
    .generatePdf({ url: "http://localhost:3000/plain-cv/", data: null })
    .then((result) => {
      response.status(200);
      response.send(result);
    })
    .catch((_) => {
      response.status(500);
      response.send({
        userMessage: "There was an error generating the PDF.",
      });
    });
});

module.exports = router;
