import React, { useState, useRef } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Smartphone, 
  Sparkles, 
  Shield, 
  Layers, 
  Monitor, 
  Eye, 
  FileCode, 
  CheckCircle2,
  ExternalLink,
  PackageCheck,
  Star,
  Share2
} from 'lucide-react';
import MyProReadyHubLogo from './MyProReadyHubLogo';

export type AssetFormat = 
  | 'app-store-apple' 
  | 'play-store-google' 
  | 'android-adaptive'
  | 'logo-horizontal' 
  | 'logo-stacked' 
  | 'brandmark-only';

export type BgPalette = 'navy' | 'midnight' | 'dark' | 'light' | 'transparent';

export default function MyProReadyHubBrandAssets() {
  const [selectedFormat, setSelectedFormat] = useState<AssetFormat>('app-store-apple');
  const [bgPalette, setBgPalette] = useState<BgPalette>('navy');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewTab, setPreviewTab] = useState<'asset' | 'appstore-ui' | 'playstore-ui' | 'homescreen'>('asset');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background color mapping
  const bgStyles: Record<BgPalette, { hex: string; desc: string; isDark: boolean }> = {
    navy: { hex: '#020617', desc: 'Deep Navy (App Store Standard)', isDark: true },
    midnight: { hex: '#0B192C', desc: 'Midnight Sapphire Gradient Base', isDark: true },
    dark: { hex: '#0f172a', desc: 'Slate Carbon Dark', isDark: true },
    light: { hex: '#FFFFFF', desc: 'Pure White (Print & Light Web)', isDark: false },
    transparent: { hex: 'transparent', desc: 'Transparent PNG / Alpha Channel', isDark: true }
  };

  // Generate SVG String for any format
  const getSvgString = (format: AssetFormat, bg: BgPalette, customWidth?: number, customHeight?: number) => {
    const isTransparent = bg === 'transparent';
    const bgColor = bgStyles[bg].hex;
    const isLightBg = bg === 'light';

    // Text fills
    const textFill1 = isLightBg ? '#0f172a' : '#6AD5F9';
    const textFill2 = '#98CC44';
    const textFill3 = isLightBg ? '#1e293b' : '#6AD5F9';
    const subTextFill = isLightBg ? '#475569' : '#94a3b8';

    if (format === 'app-store-apple') {
      // 1024 x 1024 Apple App Store Master Icon (No alpha for Apple store standard)
      const fillRect = !isTransparent ? `<rect width="1024" height="1024" fill="${bgColor === 'transparent' ? '#020617' : bgColor}"/>` : '';
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="${customWidth || 1024}" height="${customHeight || 1024}">
  <defs>
    <radialGradient id="appStoreGlow" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#6AD5F9" stop-opacity="0.15" />
      <stop offset="60%" stop-color="#020617" stop-opacity="0" />
    </radialGradient>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  ${fillRect}
  ${!isTransparent ? `<rect width="1024" height="1024" fill="url(#appStoreGlow)" />` : ''}
  
  <!-- Centered Scaled Brand Shield Emblem (Centered on 1024x1024 canvas) -->
  <g transform="translate(192, 172) scale(4.57)">
    <!-- Protective Shield Outline - Color Hex #6AD5F9 -->
    <path 
      d="M 12 28 C 42 10, 98 10, 128 28 C 128 72, 108 104, 70 118 C 32 104, 12 72, 12 28 Z" 
      stroke="#6AD5F9" 
      stroke-width="9" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
    />
    
    <!-- Brand Mark Group Scaled inside Shield -->
    <g transform="translate(26.5, 26) scale(0.70)" stroke-linecap="round" stroke-linejoin="round">
      <!-- Chimney - Color Hex #6AD5F9 -->
      <rect x="24" y="14" width="11" height="30" fill="#6AD5F9" />

      <!-- Inner Protected Home Roof - Color Hex #6AD5F9 -->
      <path 
        d="M 2 58 L 62 12 L 92 38" 
        stroke="#6AD5F9" 
        stroke-width="10" 
      />
      
      <!-- Glowing Beacon / Window (Four Squares) - Color Hex #98CC44 -->
      <rect x="51" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="51" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />

      <!-- Ready Green Checkmark - Color Hex #98CC44 -->
      <path 
        d="M 21 78 L 51 104 L 111 58" 
        stroke="#98CC44" 
        stroke-width="11" 
      />
    </g>
  </g>
</svg>`;
    }

    if (format === 'play-store-google') {
      // 512 x 512 Google Play Store Master Icon
      const fillRect = !isTransparent ? `<rect width="512" height="512" fill="${bgColor}"/>` : '';
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${customWidth || 512}" height="${customHeight || 512}">
  <defs>
    <radialGradient id="playStoreGlow" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#6AD5F9" stop-opacity="0.18" />
      <stop offset="70%" stop-color="${bgColor === 'transparent' ? '#020617' : bgColor}" stop-opacity="0" />
    </radialGradient>
  </defs>
  ${fillRect}
  ${!isTransparent ? `<rect width="512" height="512" fill="url(#playStoreGlow)" />` : ''}
  
  <!-- Centered Scaled Brand Shield Emblem (Centered on 512x512 canvas) -->
  <g transform="translate(96, 86) scale(2.285)">
    <!-- Protective Shield Outline - Color Hex #6AD5F9 -->
    <path 
      d="M 12 28 C 42 10, 98 10, 128 28 C 128 72, 108 104, 70 118 C 32 104, 12 72, 12 28 Z" 
      stroke="#6AD5F9" 
      stroke-width="9" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
    />
    
    <!-- Brand Mark Group Scaled inside Shield -->
    <g transform="translate(26.5, 26) scale(0.70)" stroke-linecap="round" stroke-linejoin="round">
      <!-- Chimney - Color Hex #6AD5F9 -->
      <rect x="24" y="14" width="11" height="30" fill="#6AD5F9" />

      <!-- Inner Protected Home Roof - Color Hex #6AD5F9 -->
      <path 
        d="M 2 58 L 62 12 L 92 38" 
        stroke="#6AD5F9" 
        stroke-width="10" 
      />
      
      <!-- Glowing Beacon / Window (Four Squares) - Color Hex #98CC44 -->
      <rect x="51" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="51" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />

      <!-- Ready Green Checkmark - Color Hex #98CC44 -->
      <path 
        d="M 21 78 L 51 104 L 111 58" 
        stroke="#98CC44" 
        stroke-width="11" 
      />
    </g>
  </g>
</svg>`;
    }

    if (format === 'android-adaptive') {
      // 192 x 192 Android Adaptive Launcher Icon
      const fillRect = !isTransparent ? `<rect width="192" height="192" fill="${bgColor}"/>` : '';
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="${customWidth || 192}" height="${customHeight || 192}">
  ${fillRect}
  <g transform="translate(36, 32) scale(0.857)">
    <path d="M 12 28 C 42 10, 98 10, 128 28 C 128 72, 108 104, 70 118 C 32 104, 12 72, 12 28 Z" stroke="#6AD5F9" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
    <g transform="translate(26.5, 26) scale(0.70)" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="14" width="11" height="30" fill="#6AD5F9" />
      <path d="M 2 58 L 62 12 L 92 38" stroke="#6AD5F9" stroke-width="10" />
      <rect x="51" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="51" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
      <path d="M 21 78 L 51 104 L 111 58" stroke="#98CC44" stroke-width="11" />
    </g>
  </g>
</svg>`;
    }

    if (format === 'brandmark-only') {
      // Pure Brand Mark Icon SVG (viewBox 140x120)
      const fillRect = !isTransparent ? `<rect width="140" height="120" fill="${bgColor}"/>` : '';
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="${customWidth || 140}" height="${customHeight || 120}">
  ${fillRect}
  <path d="M 12 28 C 42 10, 98 10, 128 28 C 128 72, 108 104, 70 118 C 32 104, 12 72, 12 28 Z" stroke="#6AD5F9" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
  <g transform="translate(26.5, 26) scale(0.70)" stroke-linecap="round" stroke-linejoin="round">
    <rect x="24" y="14" width="11" height="30" fill="#6AD5F9" />
    <path d="M 2 58 L 62 12 L 92 38" stroke="#6AD5F9" stroke-width="10" />
    <rect x="51" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
    <rect x="63" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
    <rect x="51" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
    <rect x="63" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
    <path d="M 21 78 L 51 104 L 111 58" stroke="#98CC44" stroke-width="11" />
  </g>
</svg>`;
    }

    if (format === 'logo-stacked') {
      // Stacked Vertical Full Logo (Emblem Top, Text Centered Below, NO "Secure")
      const fillRect = !isTransparent ? `<rect width="320" height="240" fill="${bgColor}"/>` : '';
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" width="${customWidth || 320}" height="${customHeight || 240}">
  ${fillRect}
  <!-- Centered Emblem -->
  <g transform="translate(90, 16)">
    <path d="M 12 28 C 42 10, 98 10, 128 28 C 128 72, 108 104, 70 118 C 32 104, 12 72, 12 28 Z" stroke="#6AD5F9" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
    <g transform="translate(26.5, 26) scale(0.70)" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="14" width="11" height="30" fill="#6AD5F9" />
      <path d="M 2 58 L 62 12 L 92 38" stroke="#6AD5F9" stroke-width="10" />
      <rect x="51" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="51" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
      <path d="M 21 78 L 51 104 L 111 58" stroke="#98CC44" stroke-width="11" />
    </g>
  </g>
  
  <!-- Centered Typography (NO "Secure" text) -->
  <text x="160" y="162" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" letter-spacing="-0.5">
    <tspan fill="${textFill1}">My</tspan><tspan fill="${textFill2}">Pro</tspan> <tspan fill="${textFill3}">Ready Hub</tspan>
  </text>
  <text x="160" y="188" text-anchor="middle" fill="${subTextFill}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" letter-spacing="1.5">
    BY MYPRO PRODUCTS
  </text>
</svg>`;
    }

    // Default: Horizontal Full Logo (Emblem Left, Text Right, NO "Secure" text)
    const fillRect = !isTransparent ? `<rect width="460" height="130" fill="${bgColor}"/>` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 130" width="${customWidth || 460}" height="${customHeight || 130}">
  ${fillRect}
  <g transform="translate(16, 5)">
    <path d="M 12 28 C 42 10, 98 10, 128 28 C 128 72, 108 104, 70 118 C 32 104, 12 72, 12 28 Z" stroke="#6AD5F9" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
    <g transform="translate(26.5, 26) scale(0.70)" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="14" width="11" height="30" fill="#6AD5F9" />
      <path d="M 2 58 L 62 12 L 92 38" stroke="#6AD5F9" stroke-width="10" />
      <rect x="51" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="44" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="51" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
      <rect x="63" y="56" width="10" height="10" fill="#98CC44" rx="1.5" />
      <path d="M 21 78 L 51 104 L 111 58" stroke="#98CC44" stroke-width="11" />
    </g>
  </g>
  <text x="175" y="58" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="900" letter-spacing="-1">
    <tspan fill="${textFill1}">My</tspan><tspan fill="${textFill2}">Pro</tspan>
  </text>
  <text x="175" y="92" fill="${textFill3}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="900" letter-spacing="-1">Ready Hub</text>
  <text x="175" y="112" fill="${subTextFill}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" letter-spacing="1.2">BY MYPRO PRODUCTS</text>
</svg>`;
  };

  // Convert SVG to High-Res PNG & Download
  const downloadPng = async (format: AssetFormat, bg: BgPalette, pixelWidth: number, pixelHeight: number, filename: string) => {
    setIsExporting(true);
    try {
      const svgCode = getSvgString(format, bg, pixelWidth, pixelHeight);
      const svgBlob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = pixelWidth;
          canvas.height = pixelHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('No canvas context');

          // If background is not transparent, fill it
          if (bg !== 'transparent') {
            ctx.fillStyle = bgStyles[bg].hex;
            ctx.fillRect(0, 0, pixelWidth, pixelHeight);
          } else {
            ctx.clearRect(0, 0, pixelWidth, pixelHeight);
          }

          ctx.drawImage(img, 0, 0, pixelWidth, pixelHeight);
          URL.revokeObjectURL(url);

          canvas.toBlob((blob) => {
            if (blob) {
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(a.href);
              resolve(true);
            } else {
              reject('Blob generation failed');
            }
          }, 'image/png');
        };
        img.onerror = reject;
        img.src = url;
      });
    } catch (err) {
      console.error('PNG export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Download Vector SVG
  const downloadSvg = (format: AssetFormat, bg: BgPalette, filename: string) => {
    const svgCode = getSvgString(format, bg);
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy SVG Code
  const copySvg = (format: AssetFormat, bg: BgPalette) => {
    const svgCode = getSvgString(format, bg);
    navigator.clipboard.writeText(svgCode);
    setCopiedType(format);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Batch Export All Store & Brand Assets
  const handleBatchExport = async () => {
    setIsExporting(true);
    // 1. Apple App Store 1024x1024
    await downloadPng('app-store-apple', 'navy', 1024, 1024, 'MyPro-ReadyHub-Apple-AppStore-1024x1024.png');
    // 2. Google Play Store 512x512
    await downloadPng('play-store-google', 'navy', 512, 512, 'MyPro-ReadyHub-GooglePlay-512x512.png');
    // 3. Android Adaptive 192x192
    await downloadPng('android-adaptive', 'navy', 192, 192, 'MyPro-ReadyHub-Android-Launcher-192x192.png');
    // 4. Horizontal Full Logo
    await downloadPng('logo-horizontal', 'transparent', 1840, 520, 'MyPro-ReadyHub-FullLogo-Horizontal-HiRes.png');
    // 5. Stacked Full Logo
    await downloadPng('logo-stacked', 'transparent', 1280, 960, 'MyPro-ReadyHub-FullLogo-Stacked-HiRes.png');
    // 6. Master Vector SVG
    downloadSvg('logo-horizontal', 'transparent', 'MyPro-ReadyHub-FullLogo-Vector.svg');
    downloadSvg('app-store-apple', 'transparent', 'MyPro-ReadyHub-BrandMark-Vector.svg');
    setIsExporting(false);
  };

  return (
    <div id="readyhub-store-branding-suite" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-lime-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-950/60 border border-cyan-800/60 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <PackageCheck className="h-3.5 w-3.5" />
            <span>Store Publishing & Brand Asset Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            MyPro Ready Hub &mdash; Brand Mark & Store Logo Kit
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Production-ready vector assets and high-resolution raster masters tailored specifically for the <strong className="text-slate-200 font-semibold">Apple App Store (1024×1024)</strong>, <strong className="text-slate-200 font-semibold">Google Play Store (512×512)</strong>, and mobile ecosystems with clean typography (subtext cleanly displays <span className="text-cyan-300 font-mono">by MyPro Products</span> with no &quot;Secure&quot; suffix).
          </p>
        </div>

        {/* Quick Batch Download Action */}
        <button
          onClick={handleBatchExport}
          disabled={isExporting}
          className="flex-shrink-0 inline-flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-cyan-500 via-cyan-400 to-lime-400 hover:from-cyan-400 hover:to-lime-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-950 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>{isExporting ? 'Generating Assets...' : 'Download Full Store Package (ZIP/PNG/SVG)'}</span>
        </button>
      </div>

      {/* Main Grid: Controls & Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 relative z-10">
        
        {/* Left Column: Format Selection & Configuration */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Format Selector */}
          <div>
            <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              1. Choose Asset Type & Specs
            </label>
            <div className="space-y-2">
              {[
                { 
                  id: 'app-store-apple' as AssetFormat, 
                  title: 'Apple App Store Icon', 
                  spec: '1024 × 1024 px PNG • Master Icon (No alpha for iOS)',
                  badge: 'iOS 18 / iPadOS',
                  icon: Smartphone
                },
                { 
                  id: 'play-store-google' as AssetFormat, 
                  title: 'Google Play Store Icon', 
                  spec: '512 × 512 px PNG • 32-bit Master Store Icon',
                  badge: 'Android 15 / Play Console',
                  icon: Layers
                },
                { 
                  id: 'android-adaptive' as AssetFormat, 
                  title: 'Android Adaptive Launcher', 
                  spec: '192 × 192 px PNG • xxxhdpi Home Screen Icon',
                  badge: 'Launcher',
                  icon: Monitor
                },
                { 
                  id: 'logo-horizontal' as AssetFormat, 
                  title: 'Full Logo — Horizontal', 
                  spec: 'Vector SVG + 1840×520 Hi-Res PNG • Clean Subtext',
                  badge: 'Header / Web',
                  icon: FileCode
                },
                { 
                  id: 'logo-stacked' as AssetFormat, 
                  title: 'Full Logo — Stacked Centered', 
                  spec: 'Vector SVG + 1280×960 Hi-Res PNG • Hero / Splash',
                  badge: 'Splash Screen',
                  icon: Shield
                },
                { 
                  id: 'brandmark-only' as AssetFormat, 
                  title: 'Brand Mark Icon Only (Shield & Beacon)', 
                  spec: 'Vector SVG + Hi-Res PNG • App Favicon / Emblem',
                  badge: 'Emblem',
                  icon: Sparkles
                }
              ].map((item) => {
                const isSelected = selectedFormat === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFormat(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between group ${
                      isSelected
                        ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-md shadow-cyan-950/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg mt-0.5 ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400 group-hover:text-cyan-400'}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold flex items-center space-x-2">
                          <span className={isSelected ? 'text-cyan-300 font-extrabold' : 'text-slate-200'}>{item.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.spec}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      isSelected ? 'bg-cyan-900/60 text-cyan-300 border-cyan-700/60' : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Background Palette */}
          <div>
            <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              2. Background Presentation Canvas
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(bgStyles) as BgPalette[]).map((paletteKey) => {
                const isSelected = bgPalette === paletteKey;
                const palette = bgStyles[paletteKey];
                return (
                  <button
                    key={paletteKey}
                    onClick={() => setBgPalette(paletteKey)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-slate-800 text-white border-cyan-500 shadow-sm'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    <span 
                      className={`h-3.5 w-3.5 rounded-full border border-slate-700 flex-shrink-0 ${
                        paletteKey === 'transparent' ? 'bg-[conic-gradient(#ccc_0.25turn,#fff_0.25turn_0.5turn,#ccc_0.5turn_0.75turn,#fff_0.75turn)]' : ''
                      }`}
                      style={{ backgroundColor: paletteKey !== 'transparent' ? palette.hex : undefined }}
                    />
                    <span className="capitalize text-[11px] truncate">{paletteKey}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compliance Info Card */}
          <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-lime-400 font-bold text-[11px] uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4" />
              <span>Store Guidelines Verified</span>
            </div>
            <ul className="text-slate-400 space-y-1.5 text-[11px] list-disc list-inside">
              <li><strong className="text-slate-300">Apple App Store:</strong> Strict 1024×1024 square PNG, opaque solid navy/black, centered optical safe margins.</li>
              <li><strong className="text-slate-300">Google Play Store:</strong> 512×512 32-bit PNG, ready for dynamic Android squircle masks.</li>
              <li><strong className="text-slate-300">Full Logo:</strong> Cleaned &quot;Secure&quot; text to retain only authoritative <code className="text-cyan-400 font-mono">BY MYPRO PRODUCTS</code>.</li>
              <li><strong className="text-slate-300">Store URLs:</strong> Privacy policy <code className="text-cyan-400 font-mono">/readyhub/privacy</code> &middot; account deletion <code className="text-cyan-400 font-mono">/readyhub/delete-account</code>.</li>
            </ul>
          </div>

        </div>

        {/* Right Column: Live Interactive Canvas & Mockup Switcher */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Preview Mode Tabs */}
          <div className="flex items-center justify-between bg-slate-950 p-1 rounded-xl border border-slate-800">
            <div className="flex space-x-1">
              {[
                { id: 'asset', label: 'Master Asset View', icon: Eye },
                { id: 'appstore-ui', label: 'App Store Mockup', icon: Smartphone },
                { id: 'playstore-ui', label: 'Play Store Mockup', icon: Layers },
                { id: 'homescreen', label: 'iOS 18 Home Screen', icon: Monitor }
              ].map((tab) => {
                const isSelected = previewTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPreviewTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-850 text-white shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-[10px] font-mono text-slate-500 px-2 py-1 uppercase hidden md:inline">
              Live Renderer
            </span>
          </div>

          {/* Preview Container */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 min-h-[380px] flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Checkerboard Pattern for transparent */}
            {bgPalette === 'transparent' && previewTab === 'asset' && (
              <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(45deg,#fff_25%,transparent_25%),linear-gradient(-45deg,#fff_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#fff_75%),linear-gradient(-45deg,transparent_75%,#fff_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,8px_0px] pointer-events-none" />
            )}

            {/* 1. MASTER ASSET VIEW */}
            {previewTab === 'asset' && (
              <div className="flex flex-col items-center justify-center space-y-4 max-w-full">
                <div 
                  className={`transition-all duration-300 rounded-2xl flex items-center justify-center p-6 sm:p-8 max-w-full shadow-2xl ${
                    bgPalette === 'light' 
                      ? 'bg-white border border-slate-200' 
                      : bgPalette === 'transparent' 
                        ? 'border border-dashed border-slate-800' 
                        : ''
                  }`}
                  style={{ 
                    backgroundColor: bgPalette !== 'transparent' && bgPalette !== 'light' ? bgStyles[bgPalette].hex : undefined 
                  }}
                >
                  {selectedFormat === 'app-store-apple' && (
                    <div className="h-44 w-44 sm:h-56 sm:w-56 rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-white/10 flex items-center justify-center bg-[#020617] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
                      <MyProReadyHubLogo showText={false} size="xl" />
                    </div>
                  )}

                  {selectedFormat === 'play-store-google' && (
                    <div className="h-44 w-44 sm:h-52 sm:w-52 rounded-[24px] overflow-hidden shadow-2xl ring-1 ring-white/10 flex items-center justify-center bg-[#020617]">
                      <MyProReadyHubLogo showText={false} size="xl" />
                    </div>
                  )}

                  {selectedFormat === 'android-adaptive' && (
                    <div className="h-32 w-32 rounded-full overflow-hidden shadow-2xl ring-2 ring-cyan-400/30 flex items-center justify-center bg-[#020617]">
                      <MyProReadyHubLogo showText={false} size="lg" />
                    </div>
                  )}

                  {selectedFormat === 'logo-horizontal' && (
                    <div className="py-4 px-6">
                      <MyProReadyHubLogo showText={true} size="lg" variant="horizontal" />
                    </div>
                  )}

                  {selectedFormat === 'logo-stacked' && (
                    <div className="py-4 px-6">
                      <MyProReadyHubLogo showText={true} size="lg" variant="stacked" />
                    </div>
                  )}

                  {selectedFormat === 'brandmark-only' && (
                    <div className="p-4">
                      <MyProReadyHubLogo showText={false} size="xl" />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
                  <span>Dimensions: {
                    selectedFormat === 'app-store-apple' ? '1024 × 1024 px' :
                    selectedFormat === 'play-store-google' ? '512 × 512 px' :
                    selectedFormat === 'android-adaptive' ? '192 × 192 px' :
                    selectedFormat === 'logo-horizontal' ? '1840 × 520 px (Scalable Vector)' :
                    selectedFormat === 'logo-stacked' ? '1280 × 960 px (Scalable Vector)' : 'Scalable Vector SVG'
                  }</span>
                  <span>&bull;</span>
                  <span className="text-cyan-400 font-bold">Standard 2026 Mobile Spec</span>
                </div>
              </div>
            )}

            {/* 2. APPLE APP STORE LISTING MOCKUP */}
            {previewTab === 'appstore-ui' && (
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-start space-x-4">
                  {/* Official 1024 Icon Rendered with iOS Squircle */}
                  <div className="h-20 w-20 rounded-[22%] bg-[#020617] ring-1 ring-white/10 shadow-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 to-transparent pointer-events-none" />
                    <MyProReadyHubLogo showText={false} size="md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-white tracking-tight truncate">MyPro Ready Hub</h4>
                    <p className="text-xs text-slate-400 truncate">Disaster Prep & AI Inventory</p>
                    <p className="text-[11px] text-cyan-400 font-semibold mt-0.5">MyPro Products LLC</p>
                    
                    <div className="flex items-center space-x-3 mt-3">
                      <button className="px-5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider shadow-sm transition-all cursor-default">
                        GET
                      </button>
                      <span className="text-[11px] text-slate-400">In-App Purchases</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800 text-center">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center justify-center space-x-0.5">
                      <span>4.9</span>
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    </div>
                    <span className="text-[10px] text-slate-400">12K RATINGS</span>
                  </div>
                  <div className="border-x border-slate-800">
                    <div className="text-xs font-bold text-white">#1</div>
                    <span className="text-[10px] text-slate-400">WEATHER & SAFETY</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">4+</div>
                    <span className="text-[10px] text-slate-400">AGE RATING</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. GOOGLE PLAY STORE LISTING MOCKUP */}
            {previewTab === 'playstore-ui' && (
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-start space-x-4">
                  {/* Google Play 512px Squircle Icon */}
                  <div className="h-20 w-20 rounded-2xl bg-[#020617] ring-1 ring-white/10 shadow-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    <MyProReadyHubLogo showText={false} size="md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-white tracking-tight truncate">MyPro Ready Hub: Prep & AI</h4>
                    <p className="text-xs text-[#98CC44] font-semibold truncate">MyPro Products</p>
                    <p className="text-[11px] text-slate-400">Contains ads &bull; In-app purchases</p>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <button className="w-full py-1.5 bg-[#98CC44] hover:bg-[#88ba3b] text-slate-950 font-bold text-xs rounded-lg transition-all cursor-default">
                        Install
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800 text-center">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center justify-center space-x-0.5">
                      <span>4.9</span>
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    </div>
                    <span className="text-[10px] text-slate-400">48K reviews</span>
                  </div>
                  <div className="border-x border-slate-800">
                    <div className="text-xs font-bold text-white">100K+</div>
                    <span className="text-[10px] text-slate-400">Downloads</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Everyone</div>
                    <span className="text-[10px] text-slate-400">Rated for 3+</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. IOS 18 HOME SCREEN MOCKUP */}
            {previewTab === 'homescreen' && (
              <div className="w-full max-w-xs bg-gradient-to-b from-blue-900/40 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
                <div className="text-center mb-4">
                  <span className="text-[11px] font-mono text-slate-400">iOS 18 Grid Simulation</span>
                </div>
                <div className="grid grid-cols-4 gap-4 items-center justify-items-center">
                  {/* App Icon */}
                  <div className="flex flex-col items-center space-y-1.5 relative">
                    <div className="h-14 w-14 rounded-[22%] bg-[#020617] ring-1 ring-white/20 shadow-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent pointer-events-none" />
                      <MyProReadyHubLogo showText={false} size="sm" />
                      {/* Notification dot */}
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center ring-2 ring-slate-900">
                        1
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-white tracking-tight truncate max-w-[60px]">
                      Ready Hub
                    </span>
                  </div>

                  {/* Dummy Companion App 1 */}
                  <div className="flex flex-col items-center space-y-1.5 opacity-40">
                    <div className="h-14 w-14 rounded-[22%] bg-[#468CDC]/20 border border-[#468CDC]/40 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-[#468CDC]" />
                    </div>
                    <span className="text-[10px] text-slate-400">Market</span>
                  </div>

                  {/* Dummy Companion App 2 */}
                  <div className="flex flex-col items-center space-y-1.5 opacity-40">
                    <div className="h-14 w-14 rounded-[22%] bg-lime-500/20 border border-lime-500/40 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-lime-400" />
                    </div>
                    <span className="text-[10px] text-slate-400">ClaimAssist</span>
                  </div>

                  {/* Dummy System App 3 */}
                  <div className="flex flex-col items-center space-y-1.5 opacity-30">
                    <div className="h-14 w-14 rounded-[22%] bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <Monitor className="h-6 w-6 text-slate-400" />
                    </div>
                    <span className="text-[10px] text-slate-400">Settings</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Quick Action Export Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Download PNG */}
            <button
              onClick={() => {
                if (selectedFormat === 'app-store-apple') {
                  downloadPng('app-store-apple', bgPalette === 'transparent' ? 'navy' : bgPalette, 1024, 1024, `MyPro-ReadyHub-Apple-AppStore-1024x1024-${bgPalette}.png`);
                } else if (selectedFormat === 'play-store-google') {
                  downloadPng('play-store-google', bgPalette, 512, 512, `MyPro-ReadyHub-GooglePlay-512x512-${bgPalette}.png`);
                } else if (selectedFormat === 'android-adaptive') {
                  downloadPng('android-adaptive', bgPalette, 192, 192, `MyPro-ReadyHub-AndroidAdaptive-192x192-${bgPalette}.png`);
                } else if (selectedFormat === 'logo-stacked') {
                  downloadPng('logo-stacked', bgPalette, 1280, 960, `MyPro-ReadyHub-FullLogo-Stacked-${bgPalette}.png`);
                } else if (selectedFormat === 'brandmark-only') {
                  downloadPng('brandmark-only', bgPalette, 1024, 878, `MyPro-ReadyHub-BrandMark-${bgPalette}.png`);
                } else {
                  downloadPng('logo-horizontal', bgPalette, 1840, 520, `MyPro-ReadyHub-FullLogo-Horizontal-${bgPalette}.png`);
                }
              }}
              disabled={isExporting}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-cyan-950 active:scale-95 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>
                {selectedFormat === 'app-store-apple' ? 'Download 1024×1024 PNG' :
                 selectedFormat === 'play-store-google' ? 'Download 512×512 PNG' :
                 selectedFormat === 'android-adaptive' ? 'Download 192×192 PNG' :
                 'Download Hi-Res PNG'}
              </span>
            </button>

            {/* Download SVG */}
            <button
              onClick={() => {
                downloadSvg(selectedFormat, bgPalette, `MyPro-ReadyHub-${selectedFormat}-${bgPalette}.svg`);
              }}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              <FileCode className="h-4 w-4 text-lime-400" />
              <span>Download Vector SVG</span>
            </button>

            {/* Copy SVG XML Code */}
            <button
              onClick={() => copySvg(selectedFormat, bgPalette)}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 font-mono"
            >
              {copiedType === selectedFormat ? (
                <>
                  <Check className="h-4 w-4 text-lime-400" />
                  <span className="text-lime-400">Copied SVG Code!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-cyan-400" />
                  <span>Copy SVG Code</span>
                </>
              )}
            </button>

          </div>

          {/* Vector XML Preview Code Box */}
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-3.5 font-mono text-[10px] text-slate-500 max-h-[90px] overflow-y-auto">
            <div className="flex justify-between items-center text-slate-600 text-[9px] font-bold uppercase tracking-wider mb-1.5 pb-1 border-b border-slate-900">
              <span>ACTIVE SVG VECTOR XML SOURCE</span>
              <span className="text-cyan-500 font-bold">{selectedFormat.toUpperCase()}</span>
            </div>
            <pre className="text-slate-400 leading-normal whitespace-pre-wrap select-all">
              {getSvgString(selectedFormat, bgPalette)}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
