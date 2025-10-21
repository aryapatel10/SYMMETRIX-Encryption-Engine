import { Lock, Unlock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { encrypt, decrypt, type EncryptionResult } from '../utils/encryption';

export function EncryptionCard() {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState(5);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [result, setResult] = useState<EncryptionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    if (!inputText.trim()) return;

    if (mode === 'encrypt') {
      setResult(encrypt(inputText, key));
    } else {
      setResult(decrypt(inputText, key));
    }
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="w-8 h-8" />
          <h1 className="text-3xl font-bold">SYMMETRIX Encryption Engine</h1>
        </div>
        <p className="text-slate-300">Caesar Cipher with XOR Encryption</p>
      </div>

      <div className="p-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('encrypt')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              mode === 'encrypt'
                ? 'bg-slate-800 text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Lock className="inline w-5 h-5 mr-2 -mt-1" />
            Encrypt
          </button>
          <button
            onClick={() => setMode('decrypt')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              mode === 'decrypt'
                ? 'bg-slate-800 text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Unlock className="inline w-5 h-5 mr-2 -mt-1" />
            Decrypt
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Input Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter encrypted text...'}
              className="w-full h-32 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-800 focus:outline-none resize-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Encryption Key: <span className="text-slate-800 text-lg">{key}</span>
            </label>
            <input
              type="range"
              min="1"
              max="25"
              value={key}
              onChange={(e) => setKey(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1</span>
              <span>25</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleProcess}
              disabled={!inputText.trim()}
              className="flex-1 bg-slate-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
            >
              {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="mt-8 space-y-4 animate-fadeIn">
              <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                <div className="flex justify-between items-start mb-3">
                  <label className="block text-sm font-semibold text-slate-700">
                    Result
                  </label>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-slate-900 font-mono text-lg break-all bg-white p-4 rounded border border-slate-200">
                  {result.result}
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border-2 border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  Transformation Steps ({result.steps.length} operations)
                </h3>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {result.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm bg-white p-3 rounded border border-slate-200"
                    >
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          step.type === 'caesar'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {step.type === 'caesar' ? 'CAESAR' : 'XOR'}
                      </span>
                      <span className="font-mono text-slate-900">{step.original}</span>
                      <span className="text-slate-400">→</span>
                      <span className="font-mono text-slate-900">{step.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
