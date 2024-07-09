import * as readline from "readline";

function caesarCipher(text: string, shift: number, lang: string): string {
  const alphabet =
    lang === "ru"
      ? "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
      : "abcdefghijklmnopqrstuvwxyz";
  const alphabetUpper = alphabet.toUpperCase();

  return text
    .split("")
    .map((char) => {
      if (alphabet.includes(char) || alphabetUpper.includes(char)) {
        const alphabetSet = alphabet.includes(char) ? alphabet : alphabetUpper;
        const base = alphabetSet.indexOf(char);
        return alphabetSet[(base + shift) % alphabetSet.length];
      }
      return char;
    })
    .join("");
}

function caesarDecipher(text: string, shift: number, lang: string): string {
  const alphabet =
    lang === "ru"
      ? "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
      : "abcdefghijklmnopqrstuvwxyz";
  return caesarCipher(text, alphabet.length - (shift % alphabet.length), lang);
}

function vigenereCipher(text: string, key: string, lang: string): string {
  const alphabet =
    lang === "ru"
      ? "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
      : "abcdefghijklmnopqrstuvwxyz";
  const alphabetUpper = alphabet.toUpperCase();
  let keyIndex = 0;

  return text
    .split("")
    .map((char) => {
      if (alphabet.includes(char) || alphabetUpper.includes(char)) {
        const alphabetSet = alphabet.includes(char) ? alphabet : alphabetUpper;
        const base = alphabetSet.indexOf(char);
        const shift = alphabet.indexOf(
          key[keyIndex % key.length].toLowerCase(),
        );
        keyIndex++;
        return alphabetSet[(base + shift) % alphabetSet.length];
      }
      return char;
    })
    .join("");
}

function vigenereDecipher(text: string, key: string, lang: string): string {
  const alphabet =
    lang === "ru"
      ? "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
      : "abcdefghijklmnopqrstuvwxyz";
  const alphabetUpper = alphabet.toUpperCase();
  let keyIndex = 0;

  return text
    .split("")
    .map((char) => {
      if (alphabet.includes(char) || alphabetUpper.includes(char)) {
        const alphabetSet = alphabet.includes(char) ? alphabet : alphabetUpper;
        const base = alphabetSet.indexOf(char);
        const shift = alphabet.indexOf(
          key[keyIndex % key.length].toLowerCase(),
        );
        keyIndex++;
        return alphabetSet[
          (base - shift + alphabetSet.length) % alphabetSet.length
        ];
      }
      return char;
    })
    .join("");
}

const messages = {
  ru: {
    chooseAction: "Выберите действие:",
    encrypt: "1. Зашифровать",
    decrypt: "2. Расшифровать",
    chooseAlgorithm: "Выберите алгоритм:",
    caesar: "1. Цезарь",
    vigenere: "2. Виженер",
    enterShift: "Введите сдвиг (целое число):",
    enterText: "Введите текст:",
    enterKey: "Введите ключевое слово:",
    encryptedText: "Зашифрованный текст:",
    decryptedText: "Расшифрованный текст:",
    incorrectAction: "Некорректное действие.",
    incorrectAlgorithm: "Некорректный алгоритм.",
    anotherOperation: "Хотите выполнить еще одну операцию? (yes/no):",
  },
  eng: {
    chooseAction: "Choose action:",
    encrypt: "1. Encrypt",
    decrypt: "2. Decrypt",
    chooseAlgorithm: "Choose algorithm:",
    caesar: "1. Caesar",
    vigenere: "2. Vigenere",
    enterShift: "Enter shift (integer):",
    enterText: "Enter text:",
    enterKey: "Enter keyword:",
    encryptedText: "Encrypted text:",
    decryptedText: "Decrypted text:",
    incorrectAction: "Incorrect action.",
    incorrectAlgorithm: "Incorrect algorithm.",
    anotherOperation: "Do you want to perform another operation? (yes/no):",
  },
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  let repeat = true;
  while (repeat) {
    const lang = await askQuestion(
      "Choose language / Выберите язык (ru/eng): ",
    );
    const msgs = lang.toLowerCase() === "ru" ? messages.ru : messages.eng;

    console.log(msgs.chooseAction);
    console.log(msgs.encrypt);
    console.log(msgs.decrypt);
    const actionChoice = await askQuestion(`${msgs.chooseAction} (1/2): `);

    console.log(msgs.chooseAlgorithm);
    console.log(msgs.caesar);
    console.log(msgs.vigenere);
    const algorithmChoice = await askQuestion(
      `${msgs.chooseAlgorithm} (1/2): `,
    );

    if (algorithmChoice === "1") {
      const shift = parseInt(await askQuestion(`${msgs.enterShift} `), 10);
      const text = await askQuestion(`${msgs.enterText} `);

      if (actionChoice === "1") {
        console.log(
          `${msgs.encryptedText} ${caesarCipher(text, shift, lang.toLowerCase())}`,
        );
      } else if (actionChoice === "2") {
        console.log(
          `${msgs.decryptedText} ${caesarDecipher(text, shift, lang.toLowerCase())}`,
        );
      } else {
        console.log(msgs.incorrectAction);
      }
    } else if (algorithmChoice === "2") {
      const key = await askQuestion(`${msgs.enterKey} `);
      const text = await askQuestion(`${msgs.enterText} `);

      if (actionChoice === "1") {
        console.log(
          `${msgs.encryptedText} ${vigenereCipher(text, key, lang.toLowerCase())}`,
        );
      } else if (actionChoice === "2") {
        console.log(
          `${msgs.decryptedText} ${vigenereDecipher(text, key, lang.toLowerCase())}`,
        );
      } else {
        console.log(msgs.incorrectAction);
      }
    } else {
      console.log(msgs.incorrectAlgorithm);
    }

    const anotherOperation = await askQuestion(`${msgs.anotherOperation} `);
    if (
      anotherOperation.toLowerCase() !== "yes" &&
      anotherOperation.toLowerCase() !== "да"
    ) {
      repeat = false;
    }
  }
  rl.close();
}

main();
