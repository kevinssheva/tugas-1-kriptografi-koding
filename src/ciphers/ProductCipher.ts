import {
  encrypt as vigenereEncrypt,
  decrypt as vigenereDecrypt,
} from "./VigenereCipher";

const productCipherEncrypt = (
  text: string,
  vigenereKey: string,
  transpositionKey: string
) => {
  const vigenereCipherText = vigenereEncrypt(text, vigenereKey);

  const transpositionCipherText = transposeEncrypt(
    vigenereCipherText,
    transpositionKey
  );

  return transpositionCipherText;
};

const productCipherDecrypt = (
  cipherText: string,
  vigenereKey: string,
  transpositionKey: string
) => {
  const transpositionPlainText = transposeDecrypt(cipherText, transpositionKey);
  const plainText = vigenereDecrypt(transpositionPlainText, vigenereKey);

  return plainText;
};

// Fungsi untuk mengenkripsi dengan Cipher Transpose berbasis kolom
const transposeEncrypt = (text: string, key: string) => {
  const columns = [];
  const keyOrder = getKeyOrder(key);
  const numColumns = key.length;
  const numRows = Math.ceil(text.length / numColumns);

  // Membagi teks menjadi kolom sesuai dengan kunci
  for (let i = 0; i < numColumns; i++) {
    const colIndex = keyOrder.indexOf(i + 1); // indexOf untuk mendapatkan index dari elemen dalam array
    let column = "";

    for (let j = 0; j < numRows; j++) {
      const index = j * numColumns + colIndex;
      if (index < text.length) {
        column += text[index];
      }
    }

    columns.push(column);
  }

  // Menggabungkan kolom-kolom menjadi teks hasil enkripsi
  return columns.join("");
};

// Fungsi untuk mendekripsi dengan Cipher Transpose berbasis kolom
const transposeDecrypt = (text: string, key: string) => {
  const keyOrder = getKeyOrder(key);
  const numColumns = key.length;
  const numRows = Math.ceil(text.length / numColumns);
  const numExtraChars = numRows * numColumns - text.length;

  const numCharsInFirstColumns = numColumns - numExtraChars;

  const columns = [];
  let start = 0;
  for (let i = 0; i < numColumns; i++) {
    const numChars = i < numCharsInFirstColumns ? numRows : numRows - 1;
    const end = start + numChars;
    columns.push(text.slice(start, end));
    start = end;
  }

  const plainText = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      const colIndex = keyOrder.indexOf(j + 1);
      plainText.push(columns[colIndex][i]);
    }
  }

  return plainText.join("");
};

// Fungsi untuk mendapatkan urutan kolom berdasarkan kunci
const getKeyOrder = (key: string) => {
  const keyChars = key.split("");
  return keyChars.map((_,index) => index + 1);
};

export { productCipherEncrypt, productCipherDecrypt };
