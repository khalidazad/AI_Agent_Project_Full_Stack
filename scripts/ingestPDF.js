import fs from "fs";
import pdf from "pdf-parse";
import { getVectorStore } from "../backend/src/rag/vectorStore.js";

const buffer = fs.readFileSync("docs/manual.pdf");

const data = await pdf(buffer);

const text = data.text;

const vectorStore = await getVectorStore();

await vectorStore.addDocuments([
 { pageContent: text }
]);
