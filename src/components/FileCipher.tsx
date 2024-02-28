import { useState } from "react";
import PlayfairCipher from "../ciphers/PlayfairCipher";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import {
  encrypt as encryptAffine,
  decrypt as decryptAffine,
} from "../ciphers/AffineCipher";
import {
  encrypt as encryptVigenere,
  decrypt as decryptVigenere,
} from "../ciphers/VigenereCipher";
import {
  encrypt as encryptExtended,
  decrypt as decryptExtended,
} from "../ciphers/ExtendedVigenereCipher";
import {
  encrypt as encryptAuto,
  decrypt as decryptAuto,
} from "../ciphers/AutoVigenereCipher";
import {
  productCipherEncrypt,
  productCipherDecrypt,
} from "../ciphers/ProductCipher";
import ToggleButton from "./ToggleButton";

const FileCipher = ({ type, inputKey }: { type: string; inputKey: string }) => {
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [encryptedContent, setEncryptedContent] = useState("");
  const [decryptedContent, setDecryptedContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [cipheredData, setCipheredData] = useState<Uint8Array>();
  const [decipheredData, setDecipheredData] = useState<Uint8Array>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setFileName(file.name);
      setFileType(file.type);
      const reader = new FileReader();

      reader.onload =
        file.type === "text/plain" ? handleTextFile : handleBinaryFile;

      if (file.type === "text/plain") {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const handleTextFile = (e: ProgressEvent<FileReader>) => {
    const content = e.target?.result as string;
    handleEncrypt(content);
  };

  const handleBinaryFile = (e: ProgressEvent<FileReader>) => {
    const arrayBuffer = e.target?.result as ArrayBuffer;
    const uint8Array = new Uint8Array(arrayBuffer);

    if (isEncrypt) {
      // Cipher the Uint8Array
      const cipheredUint8Array = cipherUint8Array(uint8Array);

      // Store the ciphered data for later use
      setCipheredData(cipheredUint8Array);
    } else {
      const decipheredData = decryptUint8Array(uint8Array);

      setDecipheredData(decipheredData);
    }
  };

  const handleDownloadButtonClick = () => {
    downloadCipheredFile(
      isEncrypt ? (cipheredData as Uint8Array) : (decipheredData as Uint8Array)
    );
  };

  function cipherUint8Array(uint8Array: Uint8Array): Uint8Array {
    const cipheredArray = new Uint8Array(uint8Array.length);
    console.log(uint8Array);
    for (let i = 0; i < uint8Array.length; i++) {
      const k = inputKey[i % inputKey.length].charCodeAt(0);
      // Replace this with your ciphering function
      cipheredArray[i] = mod(uint8Array[i] + k, 256);
    }
    console.log(cipheredArray);
    return cipheredArray;
  }
  function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  function decryptUint8Array(uint8Array: Uint8Array): Uint8Array {
    const decryptedArray = new Uint8Array(uint8Array.length);
    for (let i = 0; i < uint8Array.length; i++) {
      const k = inputKey[i % inputKey.length].charCodeAt(0);
      // Replace this with your decryption function
      decryptedArray[i] = mod(uint8Array[i] - k, 256);
    }
    console.log(decryptedArray);
    return decryptedArray;
  }

  const downloadCipheredFile = (cipheredUint8Array: Uint8Array) => {
    // Create a new Blob with the ciphered data
    const cipheredBlob = new Blob([cipheredUint8Array], { type: fileType });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(cipheredBlob);
    downloadLink.download = "ciphered_file"; // Set your desired file name

    // Append the download link to the document
    document.body.appendChild(downloadLink);

    // Trigger the download
    downloadLink.click();

    // Remove the download link from the document
    document.body.removeChild(downloadLink);
  };

  const handleDeleteFile = () => {
    setFileName("");
    setEncryptedContent("");
    const input = document.getElementById("inputFile") as HTMLInputElement;
    input.value = "";
  };

  const handleEncrypt = (content: string) => {
    if (type === "Playfair") {
      const playfair = new PlayfairCipher(inputKey || "");
      if (isEncrypt) {
        const encryptedText = playfair.encrypt(content);
        setEncryptedContent(encryptedText);
      } else {
        const decryptedText = playfair.decrypt(content);
        setDecryptedContent(decryptedText);
      }
    } else if (type === "Affine") {
      if (isEncrypt) {
        const encryptedText = encryptAffine(content, 5, 7);
        setEncryptedContent(encryptedText);
      } else {
        const decryptedText = decryptAffine(content, 5, 7);
        setDecryptedContent(decryptedText);
      }
    } else if (type === "Vigenere") {
      if (isEncrypt) {
        const encryptedText = encryptVigenere(content, inputKey);
        setEncryptedContent(encryptedText);
      } else {
        const decryptedText = decryptVigenere(content, inputKey);
        setDecryptedContent(decryptedText);
      }
    } else if (type === "Extended Vigenere") {
      if (isEncrypt) {
        const encryptedText = encryptExtended(content, inputKey);
        setEncryptedContent(encryptedText);
      } else {
        const decryptedText = decryptExtended(content, inputKey);
        setDecryptedContent(decryptedText);
      }
    } else if (type === "Auto Vigenere") {
      if (isEncrypt) {
        const encryptedText = encryptAuto(content, inputKey);
        setEncryptedContent(encryptedText);
      } else {
        const decryptedText = decryptAuto(content, inputKey);
        setDecryptedContent(decryptedText);
      }
    } else {
      if (isEncrypt) {
        const encryptedText = productCipherEncrypt(content, inputKey, inputKey);
        setEncryptedContent(encryptedText);
      } else {
        const decryptedText = productCipherDecrypt(content, inputKey, inputKey);
        setDecryptedContent(decryptedText);
      }
    }
  };

  const handleDownload = () => {
    const blob = new Blob([isEncrypt ? encryptedContent : decryptedContent], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isEncrypt ? "encrypted_file.txt" : "decrypted_file.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleToggle = (isEncrypt: boolean) => {
    setEncryptedContent("");
    setDecryptedContent("");
    setFileName("");
    const input = document.getElementById("inputFile") as HTMLInputElement;
    input.value = "";

    setIsEncrypt(isEncrypt);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {isEncrypt ? "Encrypt" : "Decrypt"} Your File
        </h1>
        <ToggleButton isEncrypt={isEncrypt} setIsEncrypt={handleToggle} />
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="inputFile"
      />
      <div className="my-2 flex flex-col items-start">
        {fileName ? (
          <div className="px-4 py-1 border-dashed border-2 border-gray-400 rounded-lg flex gap-2 items-center">
            <p>{fileName}</p>
            <div onClick={handleDeleteFile} className="cursor-pointer">
              <IoMdClose />
            </div>
          </div>
        ) : (
          <label
            htmlFor="inputFile"
            className="cursor-pointer bg-purple-700 px-4 py-1 text-white font-semibold rounded-md flex items-center gap-2"
          >
            <FaPlus />
            <p>Upload File</p>
          </label>
        )}
        {type === "Extended Vigenere" ? (
          <p className="text-sm mt-1 text-gray-500">*Add Binary File</p>
        ) : (
          <p className="text-sm mt-1 text-gray-500">*Add Text File</p>
        )}
      </div>
      <button
        onClick={
          type === "Extended Vigenere"
            ? handleDownloadButtonClick
            : handleDownload
        }
        className="bg-purple-700 font-semibold text-white px-4 py-1 rounded-md disabled:bg-gray-300"
        disabled={!fileName}
      >
        {isEncrypt ? "Encrypt" : "Decrypt"} File
      </button>
    </div>
  );
};

export default FileCipher;
