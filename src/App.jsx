import io from "socket.io-client";
import { useEffect, useState } from "react";
import { encrypt_message, decrypt_message } from "./MessageEncrypt";

const socket = io.connect(import.meta.env.VITE_IP);

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    const encrypted = encrypt_message(message);

    socket.emit("send_message", { message: encrypted });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const decrypted = decrypt_message(data.message);
      setMessageReceived(decrypted);
    });
  }, [socket]);
  return (
    <div>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        value={message}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
