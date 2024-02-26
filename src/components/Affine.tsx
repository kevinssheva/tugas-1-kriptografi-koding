import { useMemo, useState } from "react";
import { encrypt, decrypt } from "../ciphers/AffineCipher";
import { FaPlus, FaMinus } from "react-icons/fa6";
import ToggleButton from "./ToggleButton";

const Affine = ({ input }: { input: string }) => {
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [mKey, setMKey] = useState(1);
  const [bKey, setBKey] = useState(0);
  const result = useMemo(() => {
    if (isEncrypt) return encrypt(input, mKey, bKey);
    return decrypt(input, mKey, bKey);
  }, [bKey, input, isEncrypt, mKey]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gcd(a: number, b: number): any {
    return b === 0 ? a : gcd(b, a % b);
  }

  const handleIncM = (m: number) => {
    if (gcd(m, 26) !== 1) {
      handleIncM(m + 1);
      return;
    }
    setMKey(m);
  };

  const handleDecM = (m: number) => {
    if (m === 0) return;
    if (gcd(m, 26) !== 1) {
      handleDecM(m - 1);
      return;
    }
    setMKey(m);
  };

  const handleDecB = () => {
    if (bKey === 0) return;

    setBKey((prev) => (prev -= 1));
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Affine Cypher</h1>
        <ToggleButton isEncrypt={isEncrypt} setIsEncrypt={setIsEncrypt} />
      </div>
      <div className="w-full border-b-2 border-gray-300 my-3"></div>
      <div className="w-full gap-10 flex">
        <div className="flex-1">
          <p className="font-semibold text-gray-500">Slope / m</p>
          <div className="flex justify-around items-center mt-2">
            <div
              className="cursor-pointer"
              onClick={() => handleDecM(mKey - 1)}
            >
              <FaMinus />
            </div>
            <p>{mKey}</p>
            <div
              className="cursor-pointer"
              onClick={() => handleIncM(mKey + 1)}
            >
              <FaPlus />
            </div>
          </div>
        </div>
        <div className="h-10 border-x-[1px] self-center border-gray-300"></div>
        <div className="flex-1">
          <p className="font-semibold text-gray-500">Intercept / b</p>
          <div className="flex justify-around items-center mt-2">
            <div className="cursor-pointer" onClick={handleDecB}>
              <FaMinus />
            </div>
            <p>{bKey}</p>
            <div
              className="cursor-pointer"
              onClick={() => setBKey((prev) => (prev += 1))}
            >
              <FaPlus />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-b-2 border-gray-300 my-3"></div>
      <h2 className="text-xl font-semibold">Result</h2>
      <div className="w-full min-h-10 bg-zinc-100 rounded-lg p-5">
        <p>{result}</p>
      </div>
    </div>
  );
};

export default Affine;
