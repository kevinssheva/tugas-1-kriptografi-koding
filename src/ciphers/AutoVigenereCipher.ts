function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// filter alphabet only
function filterAlphabet(inputString: string) {
  return inputString.replace(/[^a-zA-Z]/g, "");
}

// Auto Vigenere Cipher
const encrypt = (text: string, key: string): string => {
  const n = 26;
  let cipherText = "";

  if (!text || !key) return "";
  const filteredString = filterAlphabet(text).toLowerCase();
  key = filterAlphabet(key).toLowerCase();

  // jika panjang key kurang dari panjang text, tambahkan text ke key hingga panjang key sama dengan panjang text
  if (key.length < filteredString.length) {
    const diff = filteredString.length - key.length;
    for (let i = 0; i < diff; i++) {
      key += filteredString[i];
    }
  }

  for (let i = 0; i < filteredString.length; i++) {
    let p = filteredString[i].charCodeAt(0);
    const k = key[i % key.length].charCodeAt(0) - 97;
    let x;

    if (p < 97) {
      p -= 65;
      x = mod(p + k, n) + 65;
    } else {
      p -= 97;
      x = mod(p + k, n) + 97;
    }

    cipherText += String.fromCharCode(x);
  }

  return cipherText;
};

const decrypt = (text: string, key: string): string => {
  const n = 26;
  let plainText = "";

  if (!text || !key) return "";
  const filteredString = filterAlphabet(text).toLowerCase();
  key = filterAlphabet(key).toLowerCase();

  // jika panjang key kurang dari panjang text, tambahkan text ke key hingga panjang key sama dengan panjang text
  if (key.length < filteredString.length) {
    const diff = filteredString.length - key.length;
    for (let i = 0; i < diff; i++) {
      key += filteredString[i];
    }
  }

  for (let i = 0; i < filteredString.length; i++) {
    let c = filteredString[i].charCodeAt(0);
    const k = key[i % key.length].charCodeAt(0) - 97;
    let p;

    if (c < 97) {
      c -= 65;
      p = mod(c - k, n) + 65;
    } else {
      c -= 97;
      p = mod(c - k, n) + 97;
    }

    plainText += String.fromCharCode(p);
  }

  return plainText;
};

export { encrypt, decrypt };
