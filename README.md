# SYMMETRIX-Encryption-Engine
Created an encryption algorithm, utilising substitution and bitwise XOR operations, implemented the prototype in Python featuring custom functions for two-way encryption and decryption of arbitrary strings. **[View Project Demo](https://symmetrix-encryption-engine.netlify.app/)**

## Methodology
1. Caesar Cipher for Substitution:

+ Encryption: Each alphabetical character in the plaintext is shifted by a fixed number of positions (the key) in the alphabet. The shift wraps around the alphabet, so a character shifted past 'Z' starts again at 'A'. Non-alphabetical characters remain unchanged.
+ Decryption: To reverse the encryption, each character is shifted back by the same number of positions. This is achieved by using a negative shift value.


2. Bitwise XOR Operation:

+ Encryption: After the substitution step, each character in the resulting text is XORed with the key to produce the final encrypted text. XOR is a bitwise operation that compares each bit of its operands and returns 1 if the bits are different and 0 if they are the same.
+ Decryption: The XOR operation is reversible using the same key. By applying XOR again with the same key to the encrypted text, the original substituted text is retrieved.


## Flow of the Code
1. Encryption Function:

Substitution Step: The caesar_cipher function performs a Caesar cipher shift on the input text using the specified key.
XOR Step: The resulting text from the substitution step is then XORed with the key. Each character is transformed based on the XOR operation, producing the final encrypted text.

2. Decryption Function:

XOR Step: The encrypted text undergoes an XOR operation with the same key used during encryption to retrieve the substituted text.
Reverse Substitution Step: The caesar_cipher function is called with a negative shift value to reverse the Caesar cipher substitution, restoring the original plaintext.

### Detailed Flow
Encryption:

+ Input: plain_text = "Arya Patel.", key = 5
+ Caesar Cipher Substitution:
+ Each character in the plaintext is shifted by 5 positions.
+ Example: 'A' -> 'F', 'r' -> 'w', 'y' -> 'd', 'a' -> 'f', 'P' -> 'U', 'a' -> 'f', 't' -> 'y', 'e' -> 'j', 'l' -> 'q'
+ Non-alphabetical character '.' remains unchanged.
+ Bitwise XOR Operation:
+ Each character in the substituted text is XORed with the key (5).
+ Example: 'F' -> 'B', 'w' -> 'r', 'd' -> 'a', 'f' -> 'c', 'U' -> 'Q', 'f' -> 'c', 'y' -> '}', 'j' -> 'e', 'q' -> 'q'

Decryption:

+ Input: encrypted_text = "BrcacQw^q"
+ Bitwise XOR Operation:
+ Each character in the encrypted text is XORed with the key (5) to retrieve the substituted text.
+ Example: 'B' -> 'F', 'r' -> 'w', 'a' -> 'd', 'c' -> 'f', 'Q' -> 'U', 'c' -> 'f', '^' -> 'y', 'q' -> 'j', 'q' -> 'q'
+ Reverse Caesar Cipher Substitution:
+ Each character in the substituted text is shifted back by 5 positions.
+ Example: 'F' -> 'A', 'w' -> 'r', 'd' -> 'y', 'f' -> 'a', 'U' -> 'P', 'f' -> 'a', 'y' -> 't', 'j' -> 'e', 'q' -> 'l'
+ Non-alphabetical character remains unchanged.

## Example Usage:
```
Plain Text: "Arya Patel."
Encrypted Text: Result after substitution and XOR operations.
Decrypted Text: Restored to original plaintext after XOR and reverse substitution.
```

This encryption and decryption methodology ensures a two-layer security approach by combining substitution and bitwise operations, making it robust against simple cryptographic attacks. The flow of the code highlights the step-by-step transformation of the text, ensuring clarity and understanding of the custom algorithm implemented.

## Output
![Encryption Demo](https://github.com/aryapatel10/SYMMETRIX-Encryption-Engine/blob/main/Encrypt.png?raw=true)

