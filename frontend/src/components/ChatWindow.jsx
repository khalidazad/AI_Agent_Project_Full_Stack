import { useState } from "react";
import { sendMessage } from "../services/api";

export default function ChatWindow() {

 const [messages, setMessages] = useState([]);
 const [input, setInput] = useState("");

 const handleSend = async () => {

  if (!input) return;

  const userMessage = { role: "user", text: input };

  setMessages(prev => [...prev, userMessage]);

  const response = await sendMessage(input);

  const aiMessage = {
   role: "ai",
   text: response.reply
  };

  setMessages(prev => [...prev, aiMessage]);

  setInput("");
 };

 return (
  <div style={{ width: "600px", margin: "auto" }}>

   <div
    style={{
     height: "400px",
     border: "1px solid #ccc",
     padding: "10px",
     overflowY: "auto"
    }}
   >

    {messages.map((m, i) => (
     <div key={i} style={{ marginBottom: "10px" }}>
      <b>{m.role === "user" ? "You" : "AI"}:</b> {m.text}
     </div>
    ))}

   </div>

   <div style={{ marginTop: "10px" }}>

    <input
     value={input}
     onChange={(e) => setInput(e.target.value)}
     style={{ width: "80%" }}
     placeholder="Ask something..."
    />

    <button onClick={handleSend}>
     Send
    </button>

   </div>

  </div>
 );
}