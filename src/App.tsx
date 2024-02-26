import { useState } from "react";
import ExtendedVigenere from "./components/ExtendedVigenere";

const Page = () => {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");

  return (
    <div className="w-full h-screen bg-purple-400 flex items-center justify-center gap-5">
      <div className="w-full max-w-xl bg-white py-5 px-7 rounded-lg">
        <div>
          <h1 className="text-3xl font-semibold mb-3">Plain Text</h1>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-zinc-100 px-4 py-3 w-full resize-none focus:outline-none"
            rows={5}
            placeholder="Enter your text here..."
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-3">Key</h1>
          <textarea
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-zinc-100 px-4 py-3 w-full resize-none focus:outline-none"
            rows={5}
            placeholder="Enter your key here..."
          />
        </div>
      </div>
      <div className="w-full max-w-xl bg-white py-5 px-7 rounded-lg">
        <ExtendedVigenere input={input} inputKey={key} />
      </div>
    </div>
  );
};

export default Page;
