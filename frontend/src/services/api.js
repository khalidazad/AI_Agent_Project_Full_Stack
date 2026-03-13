const API_URL = import.meta.env.VITE_API_URL;

export async function sendMessage(message){

 const res = await fetch("/chat",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({message})
 });

 return res.json();
}