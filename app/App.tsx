import PartySocket from "partysocket";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import * as uuid from "uuid";

let roomId = window.location.hash?.substring(1);

if (!roomId) {
  roomId = uuid.v4();
  window.location.hash = roomId;
}

const socket = new PartySocket({
  host: "vijit-ail-demo.vijit-ail.partykit.dev", // change as per your partykit host
  room: roomId,
});

export function App() {
  const [editorValue, setEditorValue] = useState("");

  const handleChange = (value: string | undefined) => {
    if (value === undefined) return;

    socket.send(value);
  };

  const onIncomingMessage = (message: MessageEvent) => {
    setEditorValue(message.data);
  };

  useEffect(() => {
    socket.addEventListener("message", onIncomingMessage);

    return () => socket.removeEventListener("message", onIncomingMessage);
  }, []);

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      theme="vs-dark"
      onChange={handleChange}
      value={editorValue}
    />
  );
}
