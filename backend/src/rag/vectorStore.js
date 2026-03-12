import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

export async function getVectorStore() {

 const pinecone = new Pinecone({
   apiKey: process.env.PINECONE_API_KEY
 });

 const index = pinecone.Index(process.env.PINECONE_INDEX);

 const embeddings = new OpenAIEmbeddings({
   apiKey: process.env.OPENAI_API_KEY
 });

 const vectorStore = await PineconeStore.fromExistingIndex(
   embeddings,
   {
     pineconeIndex: index
   }
 );

 return vectorStore;
}