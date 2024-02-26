import React from "react";
import {
  productCipherEncrypt,
  productCipherDecrypt,
} from "../ciphers/ProductCipher";
import ToggleButton from "./ToggleButton";

const ProductVT = ({
  input,
  inputKey,
}: {
  input: string;
  inputKey: string;
}) => {
  const [isEncrypt, setIsEncrypt] = React.useState(true);
  const result = React.useMemo(() => {
    if (isEncrypt) return productCipherEncrypt(input, inputKey, inputKey);
    return productCipherDecrypt(input, inputKey, inputKey);
  }, [input, isEncrypt, inputKey]);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Product Cipher</h1>
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

export default ProductVT;
