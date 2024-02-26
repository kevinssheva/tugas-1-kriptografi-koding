import { useState } from "react";
import ExtendedVigenere from "./components/ExtendedVigenere";
import Affine from "./components/Affine";
import Vigenere from "./components/Vigenere";
import Playfair from "./components/Playfair";
import ProductVT from "./components/ProductVT";

const Page = () => {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [type, setType] = useState("Affine");

  const CipherComponent = () => {
    switch (type) {
      case "Affine":
        return <Affine input={input} key={key} />;
      case "Vigenere":
        return <Vigenere input={input} inputKey={key} />;
      case "Extended Vigenere":
        return <ExtendedVigenere input={input} inputKey={key} />;
      case "Playfair":
        return <Playfair input={input} inputKey={key} />;
      case "Product":
        return <ProductVT input={input} inputKey={key} />;
      default:
        return null;
    }
  };

  const cipherType = ["Affine", "Vigenere", "Extended Vigenere", "Playfair", "Product"];
  const keyCipher = ["Vigenere", "Extended Vigenere", "Playfair", "Product"];
  return (
    <div className="w-full h-screen bg-purple-400 flex items-center justify-center">
      <div className="mr-7 flex w-full max-w-[43rem] justify-start items-start">
        <div className="flex flex-col justify-end gap-2 items-end">
          {cipherType.map((cipher) => (
            <button
              key={cipher}
              onClick={() => setType(cipher)}
              className={`pr-3 pl-5 py-2 bg-white rounded-l-lg ${
                type === cipher ? "bg-gray-300" : ""
              }`}
            >
              {cipher}
            </button>
          ))}
        </div>
        <div className="w-full flex-1 bg-white py-5 px-7 rounded-lg rounded-tl-none">
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
          {keyCipher.includes(type) && (
            <div>
              <div className="border-b-2 border-gray-300 my-3"></div>
              <h1 className="text-3xl font-semibold mb-3">Key</h1>
              <textarea
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-zinc-100 px-4 py-3 w-full resize-none focus:outline-none"
                rows={5}
                placeholder="Enter your key here..."
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-xl bg-white py-5 px-7 rounded-lg">
        <CipherComponent />
      </div>
    </div>
  );
};

export default Page;
