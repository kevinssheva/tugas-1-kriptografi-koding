import { useMemo, useState } from "react";
import { encrypt, decrypt } from "../ciphers/VigenereCipher";
import ToggleButton from "./ToggleButton";

const Vigenere = ({ input, inputKey }: { input: string; inputKey: string }) => {
  const [isEncrypt, setIsEncrypt] = useState(true);
  const result = useMemo(() => {
    if (isEncrypt) return encrypt(input, inputKey);
    return decrypt(input, inputKey);
  }, [input, isEncrypt, inputKey]);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Vigenere Cipher</h1>
        <ToggleButton isEncrypt={isEncrypt} setIsEncrypt={setIsEncrypt} />
      </div>
      <div className="w-full border-b-2 border-gray-300 my-3"></div>
      <div className="w-full gap-10 flex">
        <div className="flex-1 w-full overflow-auto">
          <p className="font-semibold text-gray-500">
            {isEncrypt ? "Cipher Text" : "Plain Text"}
          </p>
          <p className="mt-2">{result}</p>
          {isEncrypt && (
            <>
              <p className="font-semibold text-gray-500 mt-4">
                Cipher Text (Base64)
              </p>
              <p className="mt-2">{btoa(result)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vigenere;
