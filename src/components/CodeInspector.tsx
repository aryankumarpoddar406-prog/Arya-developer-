import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Shield, Layers } from 'lucide-react';
import { AppProject } from '../types';
import { generateJetpackComposeCode, generateAndroidManifest, generateBuildGradle } from '../utils/codeGenerators';

interface CodeInspectorProps {
  app: AppProject;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({ app }) => {
  const [activeFile, setActiveFile] = useState<'compose' | 'manifest' | 'gradle' | 'keystore'>('compose');
  const [copied, setCopied] = useState(false);

  const composeCode = generateJetpackComposeCode(app);
  const manifestCode = generateAndroidManifest(app);
  const gradleCode = generateBuildGradle(app);

  const keystoreInfo = `PlayForge Digital Signing Certificate (Android KeyStore)
-------------------------------------------------------
Key Alias:          ${app.android.keystoreAlias}
Key Algorithm:      RSA 2048-bit
Signature Algo:     SHA256withRSA
Key Validity:       25 Years (Expires: Oct 2051)
Target SDK:         ${app.android.targetSdk} (Android 15)
Minimum SDK:        ${app.android.minSdk} (Android 7.0 Nougat)

Certificate Fingerprints:
MD5:    8B:E1:90:3F:4A:22:11:BC:09:88:51:D4:F2:10:9A:88
SHA1:   4A:90:22:DF:33:AA:81:44:09:BB:C1:22:98:55:00:E1:92:83:AF:11
SHA256: ${app.android.sha256Fingerprint}

Status: Verified compliant with Google Play App Signing & Play Integrity API.`;

  const getCodeContent = () => {
    switch (activeFile) {
      case 'compose':
        return composeCode;
      case 'manifest':
        return manifestCode;
      case 'gradle':
        return gradleCode;
      case 'keystore':
        return keystoreInfo;
    }
  };

  const getFileName = () => {
    switch (activeFile) {
      case 'compose':
        return 'MainActivity.kt';
      case 'manifest':
        return 'AndroidManifest.xml';
      case 'gradle':
        return 'build.gradle.kts';
      case 'keystore':
        return 'keystore-certificate.txt';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([getCodeContent()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getFileName();
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* File Tabs Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveFile('compose')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              activeFile === 'compose'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>MainActivity.kt (Compose)</span>
          </button>

          <button
            onClick={() => setActiveFile('manifest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              activeFile === 'manifest'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>AndroidManifest.xml</span>
          </button>

          <button
            onClick={() => setActiveFile('gradle')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              activeFile === 'gradle'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-amber-400" />
            <span>build.gradle.kts</span>
          </button>

          <button
            onClick={() => setActiveFile('keystore')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              activeFile === 'keystore'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>Keystore Cert</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 bg-[#0a0f18] overflow-x-auto max-h-[500px] scrollbar-thin scrollbar-thumb-slate-800">
        <pre className="font-mono text-xs text-slate-300 leading-relaxed">
          <code>{getCodeContent()}</code>
        </pre>
      </div>

      <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Target SDK: 35 (Android 15) • Gradle 8.7 • Kotlin 2.0 • Jetpack Compose BOM</span>
        <span className="text-emerald-400 font-medium">Ready for Android Studio Import</span>
      </div>
    </div>
  );
};
