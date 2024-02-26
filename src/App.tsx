import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  return (
    <div className="w-full h-screen bg-purple-400 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white py-7 px-10 rounded-lg">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-zinc-200 px-4 py-3"
          placeholder="Enter your text here..."
        />
      </div>
    </div>
  );
}

export default App;
