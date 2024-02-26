class PlayfairCipher {
  private keyMatrix: string[][];

  constructor(key: string) {
    this.keyMatrix = this.generateKeyMatrix(key);
  }

  private generateKeyMatrix(key: string): string[][] {
    // Create a 5x5 matrix and fill it with unique characters from the key
    const matrix: string[][] = Array(5)
      .fill(null)
      .map(() => Array(5).fill(null));
    const keySet = new Set<string>();

    key = key.toUpperCase().replace(/J/g, "").replace(/\s/g, ""); // Replace 'J' with 'I'

    let row = 0,
      col = 0;

    for (const char of key + "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
      if (!keySet.has(char)) {
        matrix[row][col] = char;
        keySet.add(char);

        if (++col === 5) {
          col = 0;
          row++;
        }
      }
    }
    console.log(matrix);
    return matrix;
  }

  private findCoordinates(char: string): { row: number; col: number } {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.keyMatrix[i][j] === char) {
          return { row: i, col: j };
        }
      }
    }
    throw new Error(`Character not found in the key matrix: ${char}`);
  }

  private encryptDigraph(digraph: string): string {
    const { row: row1, col: col1 } = this.findCoordinates(digraph[0]);
    const { row: row2, col: col2 } = this.findCoordinates(digraph[1]);

    if (row1 === row2) {
      return (
        this.keyMatrix[row1][(col1 + 1) % 5] +
        this.keyMatrix[row2][(col2 + 1) % 5]
      );
    } else if (col1 === col2) {
      return (
        this.keyMatrix[(row1 + 1) % 5][col1] +
        this.keyMatrix[(row2 + 1) % 5][col2]
      );
    } else {
      return this.keyMatrix[row1][col2] + this.keyMatrix[row2][col1];
    }
  }

  public encrypt(plaintext: string): string {
    plaintext = plaintext.toUpperCase().replace(/J/g, "I").replace(/\s/g, ""); // Replace 'J' with 'I'
    let ciphertext = "";

    // for (let i = 0; i < plaintext.length; i += 2) {
    //     const digraph = (i + 1 === plaintext.length) ? plaintext[i] + 'X' : plaintext.slice(i, i + 2);
    //     ciphertext += this.encryptDigraph(digraph);
    // }
    let i = 0;
    while (i < plaintext.length) {
      let digraph;
      if (i + 1 === plaintext.length) {
        digraph = plaintext[i] + "X";
      } else {
        if (plaintext[i] === plaintext[i + 1]) {
          digraph = plaintext[i] + "X";
          i--;
        } else {
          digraph = plaintext.slice(i, i + 2);
        }
      }
      ciphertext += this.encryptDigraph(digraph);
      i += 2;
    }

    return ciphertext;
  }

  private decryptDigraph(digraph: string): string {
    const { row: row1, col: col1 } = this.findCoordinates(digraph[0]);
    const { row: row2, col: col2 } = this.findCoordinates(digraph[1]);

    if (row1 === row2) {
      return (
        this.keyMatrix[row1][(col1 + 4) % 5] +
        this.keyMatrix[row2][(col2 + 4) % 5]
      );
    } else if (col1 === col2) {
      return (
        this.keyMatrix[(row1 + 4) % 5][col1] +
        this.keyMatrix[(row2 + 4) % 5][col2]
      );
    } else {
      return this.keyMatrix[row1][col2] + this.keyMatrix[row2][col1];
    }
  }

  public decrypt(ciphertext: string): string {
    ciphertext = ciphertext.toUpperCase().replace(/\s/g, "");
    let plaintext = "";

    for (let i = 0; i < ciphertext.length; i += 2) {
      const digraph =
        i + 1 === ciphertext.length
          ? ciphertext[i] + "X"
          : ciphertext.slice(i, i + 2);
      plaintext += this.decryptDigraph(digraph);
    }

    return plaintext;
  }
}

export default PlayfairCipher;
