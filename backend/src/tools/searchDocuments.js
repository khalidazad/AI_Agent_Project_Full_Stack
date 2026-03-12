import { getVectorStore } from "../rag/vectorStore.js";

export async function searchDocuments(query) {

 const vectorStore = await getVectorStore();

 const docs = await vectorStore.similaritySearch(query,3);

 return docs.map(d => d.pageContent).join("\n");
}