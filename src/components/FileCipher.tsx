import { useState } from "react";
import PlayfairCipher from "../ciphers/PlayfairCipher";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const FileCipher = () => {
  const [fileContent, setFileContent] = useState("");
  const [encryptedContent, setEncryptedContent] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const file = event.target.files && event.target.files[0];

    if (file) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
      };

      reader.readAsText(file);
    }
  };

  const handleDeleteFile = () => {
    setFileName("");
    setFileContent("");
  };

  const handleEncrypt = () => {
    const playfair = new PlayfairCipher("JALANGANESHASEPULUH");
    const encryptedText = playfair.encrypt(fileContent);
    setEncryptedContent(encryptedText);
  };

  const handleDownload = () => {
    handleEncrypt();
    const blob = new Blob([encryptedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "encrypted_file.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold">Encrypt Your File</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="inputFile"
      />
      <div className="my-2 flex">
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
      </div>
      <button
        onClick={handleDownload}
        className="bg-purple-700 font-semibold text-white px-4 py-1 rounded-md disabled:bg-gray-300"
        disabled={!fileName}
      >
        Encrypt File
      </button>
    </div>
  );
};

export default FileCipher;
