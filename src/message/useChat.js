import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function useChat(onMessage) {
  const clientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({ webSocketFactory: () => socket });

    client.onConnect = () => {
      client.subscribe('/topic/greetings', msg => {
        onMessage(msg.body);
      });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [onMessage]);

  function send(destination, body) {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({ destination, body });
    }
  }

  return { send };
}
