import type { PartyKitServer } from "partykit/server";

export default {
  async onConnect(ws, room) {
    const codeEditorValue = (await room.storage.get(
      "codeEditorValue"
    )) as string;

    if (codeEditorValue) ws.send(codeEditorValue);
  },
  onMessage(message, ws, room) {
    room.storage.put("codeEditorValue", message);
    room.broadcast(message as string, [ws.id]);
  },
} satisfies PartyKitServer;
