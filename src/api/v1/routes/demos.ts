import express from "express";
import { PdfGenerator } from "../services";
const router = express.Router();

const baseUrl = "http://localhost:3000";
const data: any = {};
let count = 0;

router.get("/:template", (request, response, next) => {
  const template = request.params.template;
  const url = `${baseUrl}/${template}`;
  PdfGenerator.instance
    .generatePdf({ url, data: null })
    .then((result) => {
      response.status(200).send(result);
    })
    .catch(() => {
      response.status(500).send({ userMessage: "Could not get demo PDF." });
    });
});

router.post("/:template", (request, response, next) => {
  const template: string = request.params.template;
  const id = generateGuid();

  const url = `http://localhost:3000/${template}?guid=${id}`;
  data[id] = request.body;
  PdfGenerator.instance
    .generatePdf({ url, data: null })
    .then((result) => {
      response.status(200).send(result);
    })
    .catch(() => {
      response.status(500).send({ userMessage: "Could not generate PDF." });
    });
});

router.get("/data/:id", (request, response, next) => {
  const id = request.params.id;
  if (data[id]) {
    response.json(data[id]);
  } else {
    response.status(404).send({ userMessage: `Could not find ${id}` });
  }
});

function generateGuid() {
  return count++;
}
module.exports = router;
