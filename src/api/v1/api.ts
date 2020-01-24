import express from "express";
import { PdfGenerator } from "./services";

var router = express.Router();

router.get("/", (request, response, next) => {
  PdfGenerator.instance
    .generatePdf({ url: "https://www.example.com", data: null })
    .then(result => {
      response.status(200);
      response.send(result);
    })
    .catch(_ => {
      response.status(500);
      response.send({
        userMessage: "There was an error generating the PDF."
      });
    });
});

module.exports = router;