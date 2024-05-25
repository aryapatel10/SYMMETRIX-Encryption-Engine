def caesar_cipher(text, shift):
    encrypted_text = ""
    for char in text:
        if char.isalpha():
            shifted_char = chr((ord(char) - 65 + shift) % 26 + 65) if char.isupper() else chr((ord(char) - 97 + shift) % 26 + 97)
            encrypted_text += shifted_char
            print(f"Substitution: {char} -> {shifted_char}")
        else:
            encrypted_text += char
    return encrypted_text

def encrypt(text, key):
    """Encrypts text using substitution and bitwise XOR operation."""

    substituted_text = caesar_cipher(text, key)
   
    encrypted_text = ""
    for char in substituted_text:
        encrypted_character = ord(char) ^ key
        encrypted_text += chr(encrypted_character)
        print(f"XOR: {char} -> {chr(encrypted_character)}")
    return encrypted_text

def decrypt(text, key):
    """Decrypts text using bitwise XOR operation and reverse substitution."""
    decrypted_text = ""
    for char in text:
        decrypted_character = ord(char) ^ key
        decrypted_text += chr(decrypted_character)
   
    decrypted_text = caesar_cipher(decrypted_text, -key)
    return decrypted_text

# Example usage:
plain_text = "Arya Patel."
key = 5
encrypted_text = encrypt(plain_text, key)
decrypted_text = decrypt(encrypted_text, key)

print("Plain text:", plain_text)
print("Encrypted text:", encrypted_text)
print("Decrypted text:", decrypted_text)