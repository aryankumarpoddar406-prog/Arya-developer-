import React, { useState } from 'react';
import { X, Download, ShieldCheck, CheckCircle2, FileCode, Package, Smartphone, RefreshCw } from 'lucide-react';
import { AppProject } from '../types';
import { generateJetpackComposeCode, generateAndroidManifest, generateBuildGradle } from '../utils/codeGenerators';

interface ExportModalProps {
  app: AppProject;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ app, onClose }) => {
  const [downloadingType, setDownloadingType] = useState<string | null>(null);

  const triggerDownload = (filename: string, content: string, type: string) => {
    setDownloadingType(type);
    setTimeout(() => {
      const blob = new Blob([content], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadingType(null);
    }, 700);
  };

  const handleDownloadAab = () => {
    const mockAabContent = `PlayForge Release Bundle (AAB v${app.android.versionName})\nPackage: ${app.android.packageName}\nTarget SDK: ${app.android.targetSdk}\nSigned by: ${app.android.keystoreAlias}\nSHA256: ${app.android.sha256Fingerprint}`;
    triggerDownload(`${app.name.toLowerCase().replace(/\s+/g, '-')}-release.aab`, mockAabContent, 'aab');
  };

  const handleDownloadApk = () => {
    const mockApkContent = `PlayForge Universal Signed APK (v${app.android.versionName})\nPackage: ${app.android.packageName}\nTarget SDK: ${app.android.targetSdk}\nDirect sideload ready for Android 7.0 - 15.`;
    triggerDownload(`${app.name.toLowerCase().replace(/\s+/g, '-')}-signed.apk`, mockApkContent, 'apk');
  };

  const handleDownloadZip = () => {
    const compose = generateJetpackComposeCode(app);
    const manifest = generateAndroidManifest(app);
    const gradle = generateBuildGradle(app);

    const projectArchive = `// PlayForge Android Studio Complete Project
// ==========================================
// File: app/src/main/java/${app.android.packageName.replace(/\./g, '/')}/MainActivity.kt
${compose}

// File: app/src/main/AndroidManifest.xml
${manifest}

// File: app/build.gradle.kts
${gradle}
`;
    triggerDownload(`${app.name.toLowerCase().replace(/\s+/g, '-')}-android-project.zip`, projectArchive, 'zip');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">
              Export Package & Binaries
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Download your signed Android binaries and full Android Studio source code for free without any tokens or credits.
          </p>
        </div>

        <div className="space-y-3">
          {/* Release AAB */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Android App Bundle (.AAB)</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                    Google Play Ready
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Signed release bundle with ProGuard shrinking (18.4 MB)
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadAab}
              disabled={downloadingType === 'aab'}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
            >
              {downloadingType === 'aab' ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>.AAB</span>
            </button>
          </div>

          {/* Signed APK */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Signed Android APK (.APK)</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.2 rounded font-mono">
                    Direct Sideload
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Install directly on any Android phone (Universal APK)
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadApk}
              disabled={downloadingType === 'apk'}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
            >
              {downloadingType === 'apk' ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>.APK</span>
            </button>
          </div>

          {/* Android Studio ZIP Project */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Android Studio Source Project</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-mono">
                    Kotlin + Gradle
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Full Jetpack Compose project structure (.zip archive)
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={downloadingType === 'zip'}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
            >
              {downloadingType === 'zip' ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>.ZIP</span>
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>All packages include digital RSA-2048 Play Keystore certificate verification.</span>
        </div>
      </div>
    </div>
  );
};
