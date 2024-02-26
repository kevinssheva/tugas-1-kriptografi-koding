import { useState } from "react";
import "./App.css";
import Affine from "./components/Affine";

function App() {
  const [input, setInput] = useState("");

  return (
    <div className="w-full h-screen bg-purple-400 flex items-center justify-center gap-5">
      <div className="w-full max-w-xl bg-white py-5 px-7 rounded-lg">
        <h1 className="text-3xl font-semibold mb-3">Plain Text</h1>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-zinc-100 px-4 py-3 w-full resize-none focus:outline-none"
          rows={5}
          placeholder="Enter your text here..."
        />
      </div>
      <div className="w-full max-w-xl bg-white py-5 px-7 rounded-lg">
        <Affine input={input} />
      </div>
    </div>
  );
}

export default App;
