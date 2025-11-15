import React, { useState } from "react";
import useChat from "./useChat"

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { send } = useChat((msg) => setMessages(m => [...m,  JSON.parse(msg)]));
const[payload,setPayload]=useState({});
console.log(messages);


  return (
    <div>
      <ul>{messages.map((m,i) => <li key={i}>{m?.message}</li>)}</ul>
      <input id="t" />
      <button onClick={() => {
        const v = document.getElementById('t').value;

        send('/app/sendMessage',  JSON.stringify({sender:"User",message:v,timeStamp:""}));
      }}>Send</button>
    </div>
  );
}
