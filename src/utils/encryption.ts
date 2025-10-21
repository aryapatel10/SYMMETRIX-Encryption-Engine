export interface SubstitutionStep {
  original: string;
  result: string;
  type: 'caesar' | 'xor';
}

export interface EncryptionResult {
  result: string;
  steps: SubstitutionStep[];
}

function caesarCipher(text: string, shift: number): { result: string; steps: SubstitutionStep[] } {
  let encryptedText = "";
  const steps: SubstitutionStep[] = [];

  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const base = isUpper ? 65 : 97;
      const shiftedChar = String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
      encryptedText += shiftedChar;
      steps.push({ original: char, result: shiftedChar, type: 'caesar' });
    } else {
      encryptedText += char;
    }
  }

  return { result: encryptedText, steps };
}

export function encrypt(text: string, key: number): EncryptionResult {
  const allSteps: SubstitutionStep[] = [];

  const { result: substitutedText, steps: caesarSteps } = caesarCipher(text, key);
  allSteps.push(...caesarSteps);

  let encryptedText = "";
  for (const char of substitutedText) {
    const encryptedChar = String.fromCharCode(char.charCodeAt(0) ^ key);
    encryptedText += encryptedChar;
    allSteps.push({ original: char, result: encryptedChar, type: 'xor' });
  }

  return { result: encryptedText, steps: allSteps };
}

export function decrypt(text: string, key: number): EncryptionResult {
  const allSteps: SubstitutionStep[] = [];

  let decryptedText = "";
  for (const char of text) {
    const decryptedChar = String.fromCharCode(char.charCodeAt(0) ^ key);
    decryptedText += decryptedChar;
    allSteps.push({ original: char, result: decryptedChar, type: 'xor' });
  }

  const { result: finalText, steps: caesarSteps } = caesarCipher(decryptedText, -key);
  allSteps.push(...caesarSteps);

  return { result: finalText, steps: allSteps };
}
