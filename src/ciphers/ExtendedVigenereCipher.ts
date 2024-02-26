function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const encrypt = (text: string, key: string): string => {
  const n = 256;
  let cipherText = "";

  if (!text || !key) return "";

  for (let i = 0; i < text.length; i++) {
    const p = text[i].charCodeAt(0);
    const k = key[i % key.length].charCodeAt(0);
    const x = mod(p + k, n);
    
    cipherText += String.fromCharCode(x);
  }

  return cipherText;
};

const decrypt = (text: string, key: string): string => {
  const n = 256;
  let plainText = "";

  if (!text || !key) return "";

  for (let i = 0; i < text.length; i++) {
    const c = text[i].charCodeAt(0);
    const k = key[i % key.length].charCodeAt(0);

    const p = mod(c - k, n);

    plainText += String.fromCharCode(p);
  }

  return plainText;
};

export { encrypt, decrypt };
