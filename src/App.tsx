import { EncryptionCard } from './components/EncryptionCard';
import { Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-slate-600 text-lg">
              Secure Text Encryption & Decryption
            </h2>
          </div>

          <EncryptionCard />

          <div className="mt-12 max-w-4xl w-full bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-3">How It Works</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Caesar Cipher</h4>
                <p>
                  Each letter is shifted by the key value in the alphabet. For example, with key=5,
                  'A' becomes 'F', 'B' becomes 'G', and so on.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">XOR Encryption</h4>
                <p>
                  After substitution, each character undergoes a bitwise XOR operation with the key,
                  adding an additional layer of security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
