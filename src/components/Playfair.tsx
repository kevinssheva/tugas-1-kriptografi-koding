import { useState } from "react";
import PlayfairCipher from "../ciphers/PlayfairCipher";
import ToggleButton from "./ToggleButton";

const Playfair = ({ input, inputKey }: { input: string; inputKey: string }) => {
  const [isEncrypt, setIsEncrypt] = useState(true);

  const playfair = new PlayfairCipher(inputKey || "");

  const result = isEncrypt ? playfair.encrypt(input) : playfair.decrypt(input);

  console.log(result, inputKey, input, isEncrypt);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Playfair Cipher</h1>
        <ToggleButton isEncrypt={isEncrypt} setIsEncrypt={setIsEncrypt} />
      </div>
      <div className="w-full border-b-2 border-gray-300 my-3"></div>
      <div className="w-full gap-10 flex">
        <div className="flex-1">
          <p className="font-semibold text-gray-500">
            {isEncrypt ? "Cipher Text" : "Plain Text"}
          </p>
          <p className="mt-2">{result}</p>
        </div>
      </div>
    </div>
  );
};

export default Playfair;
