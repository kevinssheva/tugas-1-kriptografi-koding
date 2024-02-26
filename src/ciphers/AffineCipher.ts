function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function filterAlphabet(inputString: string) {
  return inputString.replace(/[^a-zA-Z]/g, "");
}

const encrypt = (text: string, m: number, b: number): string => {
  const n = 26;
  let cipherText = "";
  const filteredString = filterAlphabet(text);
  for (let i = 0; i < filteredString.length; i++) {
    let p = filteredString[i].charCodeAt(0);
    let x;
    if (p < 97) {
      p -= 65;
      x = ((m * p + b) % n) + 65;
    } else {
      p -= 97;
      x = ((m * p + b) % n) + 97;
    }

    cipherText += String.fromCharCode(x);
  }

  return cipherText;
};

const decrypt = (text: string, m: number, b: number): string => {
  const n = 26;
  let x = 0; // m^-1
  let plainText = "";
  const filteredString = filterAlphabet(text);
  do {
    x++;
  } while ((m * x) % n !== 1);

  for (let i = 0; i < filteredString.length; i++) {
    let c = filteredString[i].charCodeAt(0);
    let p;

    if (c < 97) {
      c -= 65;
      p = mod(x * (c - b), n) + 65;
    } else {
      c -= 97;
      p = mod(x * (c - b), n) + 97;
    }

    plainText += String.fromCharCode(p);
  }

  return plainText;
};

export { encrypt, decrypt };
