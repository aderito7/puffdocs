import puppeteer from "puppeteer";
import { GeneratePdfOptions } from "../interfaces/";

export class PdfGenerator {
  private static _service = new PdfGenerator();

  generatePdf<T>(options: GeneratePdfOptions<T>): Promise<string> {
    const promise: Promise<string> = new Promise(
      async (
        resolve: (value?: string | PromiseLike<string> | undefined) => void,
        reject: (reason?: any) => void
      ) => {
        const pdfString: string = await this.getPdf(options);
        pdfString === ""
          ? reject("Could not generate PDF.")
          : resolve(pdfString);
      }
    );
    return promise;
  }

  private async getPdf<T>(options: GeneratePdfOptions<T>): Promise<string> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(options.url, { waitUntil: "networkidle2" });

      const buffer = await page.pdf({
        format: "A4"
      });

      await browser.close();

      return buffer.toString();
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  static get instance() {
    return PdfGenerator._service;
  }
  private constructor() {}
}
