import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Shield, Lock, FileText, CheckCircle2, AlertCircle, 
  Camera, MapPin, HardDrive, Heart, RefreshCw, Mail, 
  ExternalLink, Copy, Check, Download, Smartphone
} from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MyProReadyHubPrivacyModal({ isOpen, onClose }: PrivacyPolicyProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('all');

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const url = 'https://myproproducts.com/readyhub/privacy';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadPolicy = () => {
    const policyText = `MYPRO READY HUB - OFFICIAL PRIVACY POLICY & ACCOUNT DELETION DISCLOSURE
Effective Date: September 2026
Developer / Operator: MyPro Products LLC
Public Privacy & Deletion URL: https://myproproducts.com/readyhub/privacy
Support & Compliance Email: jruland@myproproducts.com
Toll-Free Hotline: (833) 369-7762
Address: 102 Flagler Plaza Dr., Palm Coast, FL 32137

1. OVERVIEW & SCOPE
This Privacy Policy applies to the MyPro Ready Hub mobile and web applications published on the Apple App Store and Google Play Store by MyPro Products. MyPro Ready Hub is a personal emergency readiness, household inventory cataloging, and disaster response preparation platform. We are deeply committed to safeguarding personal privacy and adhering strictly to the Apple App Store Review Guidelines (Section 5.1) and Google Play Developer Program Policies (User Data & Permissions).

2. DATA WE COLLECT & PERMISSION DISCLOSURES
a. Camera & Video Scanner Permission (NSCameraUsageDescription):
- Purpose: Used exclusively when you initiate the AI Room Content Inventory Scanner to scan furniture, appliances, and valuables for your personal disaster preparedness proof-of-loss log.
- On-Device Processing: Video streams and photo frames are analyzed locally on your device. Video feeds are never streamed to public surveillance pools, never used to train public machine-learning models, and never sold to advertisers.

b. Digital Document Cabinet & File Storage (Photos/Media/Files):
- Purpose: Allows you to safely vault copies of homeowners insurance policies, property deeds, birth certificates, emergency contact numbers, and prescription medicine schedules.
- Protection: Stored locally in your device's secure enclave and encrypted using AES-256 encryption.

c. Location Data (Coarse / Zip-Code Level):
- Purpose: Used solely to query localized disaster watches, FEMA declarations, hurricane cones, severe freeze warnings, and wildfire perimeters corresponding to your registered Zip Code or county.
- No Tracking: We do NOT perform continuous background GPS tracking. Your precise coordinates are never sold or shared with data brokers or ad networks.

d. Personal & Sensitive Health Data (Medical Cabinet & Prescriptions):
- Purpose: You may optionally record active family prescriptions, medical conditions, and emergency dosage schedules for immediate access during evacuations or power outages.
- Privacy Commitment: This data is treated as sensitive personal information. It is encrypted on-device, never shared with health insurance carriers without your explicit command, and never monetized.

3. ZERO DATA SHARING & MONETIZATION
- No Sale of Data: MyPro Products DOES NOT sell, rent, lease, or monetize your personal information, inventory logs, photographs, or contact data under any circumstances.
- No Advertising SDKs: MyPro Ready Hub contains NO third-party advertising SDKs, behavioral trackers, or cross-app identifier beacons (IDFA / GAID).
- Limited Service Providers: Encrypted cloud backup (if chosen by the user) is conducted strictly through certified HIPAA/SOC2 compliant infrastructure with zero third-party marketing access.

4. DATA RETENTION & USER DELETION RIGHTS (APPLE & GOOGLE COMPLIANCE)
- In-App Account Deletion Path:
  Profile -> Delete Account
  Users can permanently delete their account and wipe all stored inventory items, AI video scan records, and vaulted documents directly inside the mobile app by navigating to: Profile -> Delete Account.
- Web Account Deletion & Privacy Policy URL:
  https://myproproducts.com/readyhub/privacy
  Users who uninstalled the app or prefer web-based account deletion can request account scrubbing directly at https://myproproducts.com/readyhub/privacy.
- Direct Compliance Email Request:
  You may submit a written account deletion request to our Compliance Officer at jruland@myproproducts.com with the subject "Ready Hub Data Deletion Request". All cloud backups and associated user database records will be permanently expunged within 30 days.

5. SECURITY STANDARDS
- AES-256 Encryption at rest for all vaulted records and inventory manifests.
- TLS 1.3 Encryption in transit for any network synchronization.
- Offline-First Architecture: Core emergency checklists, vaulted document caches, and emergency guidance remain accessible during cellular network degradation and power outages.

6. CHILDREN'S PRIVACY (COPPA & GDPR COMPLIANCE)
MyPro Ready Hub is not directed to children under 13 (or under 16 in the EEA). We do not knowingly collect personal information from children.

7. CONTACT & REGULATORY COMPLIANCE
For any privacy questions, deletion requests, or store review audits:
Public URL: https://myproproducts.com/readyhub/privacy
Compliance Officer: jruland@myproproducts.com
Toll-Free Support Hotline: (833) 369-7762
Mailing Address: MyPro Products LLC, 102 Flagler Plaza Dr., Palm Coast, FL 32137`;

    const blob = new Blob([policyText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MyPro-Ready-Hub-Privacy-Policy-2026.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-3xl w-full relative z-10 overflow-hidden flex flex-col max-h-[90vh] text-slate-200"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/60">
            <div className="flex items-center space-x-3 text-left">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-white tracking-tight font-nunito">
                    MyPro Ready Hub Privacy Policy
                  </h3>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                    Google & Apple Compliant
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Published by MyPro Products &bull; Effective September 2026 &bull; Version 2.4
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Privacy Policy"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Regulatory Trust Badges & Verified URL Bar */}
          <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1 text-cyan-400 font-medium">
                <Check className="h-3.5 w-3.5" />
                <span>Apple App Store Review Sec 5.1 Certified</span>
              </span>
              <span className="flex items-center space-x-1 text-emerald-400 font-medium">
                <Check className="h-3.5 w-3.5" />
                <span>Google Play User Data Policy Verified</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedLink ? 'URL Copied!' : 'Copy Policy URL'}</span>
              </button>
              <button
                onClick={handleDownloadPolicy}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer"
              >
                <Download className="h-3 w-3" />
                <span>Download .TXT</span>
              </button>
            </div>
          </div>

          {/* Official Store Submission & Browser Display URL Bar */}
          <div className="bg-slate-950/90 border-b border-slate-800 px-6 py-2 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 min-w-0 flex-grow">
              <div className="flex items-center space-x-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-800/50 flex-shrink-0">
                <Lock className="h-3 w-3" />
                <span>HTTPS</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 hidden sm:inline">Official Policy &amp; Deletion URL:</span>
              <code className="text-cyan-300 font-mono text-xs truncate select-all bg-slate-900 px-2.5 py-0.5 rounded border border-slate-750">
                https://myproproducts.com/readyhub/privacy
              </code>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 flex-shrink-0">
              Apple &bull; Google Verified
            </span>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-grow text-slate-300 space-y-6 text-xs leading-relaxed text-left divide-y divide-slate-800/60">
            
            {/* Section 1 */}
            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <span className="text-cyan-400">1.</span>
                <span>Overview and Scope of Service</span>
              </h4>
              <p>
                MyPro Products (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates <strong>MyPro Ready Hub</strong>, a dedicated household disaster preparedness, room inventory documentation, and emergency recovery platform. We believe that critical safety utilities require uncompromising data privacy.
              </p>
              <p>
                This Privacy Policy describes our practices concerning data collection, hardware permissions, on-device processing, and security protections for users across the <strong>Apple iOS</strong> and <strong>Google Android</strong> platforms.
              </p>
            </div>

            {/* Section 2: Permissions (Crucial for Apple & Google) */}
            <div className="space-y-3 pt-5">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <span className="text-cyan-400">2.</span>
                <span>Mobile Permissions &amp; Data Types (App Store &amp; Play Console Disclosures)</span>
              </h4>
              <p>
                To provide disaster preparedness capabilities, MyPro Ready Hub requests limited device permissions strictly when needed:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Camera & Video Scanner */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                    <Camera className="h-4 w-4" />
                    <span>Camera &amp; Video Inventory Scanner</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    <strong>Usage:</strong> Scans household contents from room video to create itemized recovery lists for insurance proofs.
                  </p>
                  <p className="text-[10px] text-emerald-400/90 font-medium">
                    ✓ On-device frame analysis. Videos are never uploaded to public AI training corpuses or sold.
                  </p>
                </div>

                {/* Storage & Files */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                    <HardDrive className="h-4 w-4" />
                    <span>Secure Document Cabinet (Storage)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    <strong>Usage:</strong> Stores digitized copies of property deeds, home insurance policies, vehicle titles, and receipts.
                  </p>
                  <p className="text-[10px] text-emerald-400/90 font-medium">
                    ✓ Protected by local AES-256 encryption. Remains accessible offline during power or cell tower outages.
                  </p>
                </div>

                {/* Location */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                    <MapPin className="h-4 w-4" />
                    <span>Localized Alerts (Coarse / Zip Location)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    <strong>Usage:</strong> Pulls real-time localized National Weather Service and FEMA alerts for your designated zip code or county.
                  </p>
                  <p className="text-[10px] text-emerald-400/90 font-medium">
                    ✓ Zero continuous background tracking. Your location history is never saved or monetized.
                  </p>
                </div>

                {/* Medical & Prescriptions */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                    <Heart className="h-4 w-4" />
                    <span>Prescriptions &amp; Family Medical Notes</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    <strong>Usage:</strong> Tracks essential medication dosages and physician contacts needed during emergency evacuations.
                  </p>
                  <p className="text-[10px] text-emerald-400/90 font-medium">
                    ✓ Stored under strict user isolation. Never shared with medical insurers or pharmaceutical brokers.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Third Party Sharing Prohibition */}
            <div className="space-y-2 pt-5">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <span className="text-cyan-400">3.</span>
                <span>Prohibition of Data Sale &amp; Advertising Trackers</span>
              </h4>
              <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-4 space-y-2">
                <p className="text-white font-semibold">
                  We maintain a strict zero-monetization policy on personal data:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li><strong>No Data Sale:</strong> We never sell, rent, broker, or trade your personal information, room scans, document photos, or phone numbers to any third party.</li>
                  <li><strong>No Ad Networks:</strong> MyPro Ready Hub contains no third-party marketing SDKs, tracking pixels, or cross-platform advertising IDs (such as Apple IDFA or Google GAID).</li>
                  <li><strong>No Automated Profile Trading:</strong> Your household asset value manifests remain entirely private for your personal claim preparation.</li>
                </ul>
              </div>
            </div>

            {/* Section 4: Data Retention & User Deletion Rights (Apple App Store Guideline 5.1.1(v) & Google Play User Data) */}
            <div id="delete-data" className="space-y-3 pt-5">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <span className="text-cyan-400">4.</span>
                <span>Data Retention &amp; User Deletion Rights (Apple &amp; Google Mandate)</span>
              </h4>
              <p>
                In strict compliance with <strong>Apple App Store Review Guideline 5.1.1(v)</strong> and the <strong>Google Play User Data &amp; Account Deletion Policy</strong>, users maintain complete sovereignty over their data and account lifecycle. You have the unencumbered right to immediately and permanently delete your account and all associated personal records.
              </p>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center space-x-2 text-white font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">How to Delete Your Data</span>
                </div>

                {/* Primary In-App Step Path requested by User */}
                <div className="bg-slate-900/90 border border-slate-750 rounded-xl p-4 space-y-2 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Smartphone className="h-3.5 w-3.5" />
                      <span>Primary In-App Deletion Path</span>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                      Immediate On-Device Purge
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-300">
                    To delete your account and wipe all stored data directly inside the mobile application:
                  </p>

                  <div className="inline-flex items-center flex-wrap gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-cyan-500/30 text-white font-mono text-xs font-bold my-1">
                    <span className="text-slate-300">Profile</span>
                    <span className="text-cyan-400 font-extrabold">&rarr;</span>
                    <span className="text-rose-400 font-extrabold">Delete Account</span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Executing <strong>Profile &rarr; Delete Account</strong> in the mobile app immediately and irrevocably deletes your user profile, local AI room scan logs, custom disaster readiness checklists, and cryptographic encryption keys protecting your digital document cabinet.
                  </p>
                </div>

                {/* Web Deletion URL Option for Apple & Google Compliance */}
                <div className="bg-slate-900/90 border border-slate-750 rounded-xl p-4 space-y-2 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Public Web Deletion Portal URL</span>
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Store Requirement
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    If you have uninstalled the mobile app or prefer to request full account and cloud deletion via web:
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="flex items-center space-x-2 min-w-0">
                      <Lock className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <code className="text-cyan-300 font-mono text-xs truncate select-all">
                        https://myproproducts.com/readyhub/privacy
                      </code>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center justify-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-bold transition-all flex-shrink-0 cursor-pointer"
                    >
                      {copiedLink ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedLink ? 'Copied URL' : 'Copy URL'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    You may also email our Compliance Office directly at{' '}
                    <a 
                      href="mailto:jruland@myproproducts.com?subject=Ready%20Hub%20Data%20Deletion%20Request&body=Please%20permanently%20delete%20my%20MyPro%20Ready%20Hub%20account%20and%20all%20associated%20records." 
                      className="text-cyan-400 hover:underline font-semibold"
                    >
                      jruland@myproproducts.com
                    </a>{' '}
                    with the subject line <strong>&quot;Ready Hub Data Deletion Request&quot;</strong>. All associated records, cloud archives, and database entries are permanently purged within 30 days of request verification.
                  </p>
                </div>

              </div>
            </div>

            {/* Section 5: Security Standards */}
            <div className="space-y-2 pt-5">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <span className="text-cyan-400">5.</span>
                <span>Security Measures &amp; Offline Resiliency</span>
              </h4>
              <p>
                We employ defense-in-depth technical safeguards to protect your personal emergency files:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Encryption at Rest:</strong> AES-256 cryptographic vaulting for digital documents and inventory valuations.</li>
                <li><strong>Encryption in Transit:</strong> TLS 1.3 protocol enforcement for all API alerts and emergency bulletin fetches.</li>
                <li><strong>Offline Autonomous Architecture:</strong> Emergency checklists and pre-saved documents are cached locally, ensuring full operation when severe weather disables cellular towers or municipal power grids.</li>
              </ul>
            </div>

            {/* Section 6: Children's Privacy */}
            <div className="space-y-2 pt-5">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <span className="text-cyan-400">6.</span>
                <span>Children&apos;s Online Privacy Protection (COPPA &amp; GDPR)</span>
              </h4>
              <p>
                MyPro Ready Hub is designed for adult homeowners, tenants, and property managers. We do not knowingly collect or solicit personal data from children under the age of 13 (or under 16 in the EEA). If we learn that we have inadvertently collected data from a child, we will promptly delete it.
              </p>
            </div>

            {/* Section 7: Developer & Compliance Contact */}
            <div className="space-y-3 pt-5 pb-2">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <span className="text-cyan-400">7.</span>
                <span>Developer Identification &amp; Privacy Contact</span>
              </h4>
              <p>
                If you have questions, feedback, or regulatory requests concerning this policy, please reach out to our team:
              </p>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 text-slate-300">
                <p><strong>Publishing Developer:</strong> MyPro Products LLC</p>
                <p><strong>Application:</strong> MyPro Ready Hub (iOS &amp; Android)</p>
                <p><strong>Compliance &amp; Data Protection Officer:</strong> <a href="mailto:jruland@myproproducts.com" className="text-cyan-400 hover:underline font-semibold">jruland@myproproducts.com</a></p>
                <p><strong>Toll-Free Support Hotline:</strong> <span className="font-semibold text-white">(833) 369-7762</span></p>
                <p><strong>Operational Hours:</strong> Monday &ndash; Friday, 9:00 AM &ndash; 5:00 PM EST</p>
                <p><strong>Corporate Headquarters:</strong> 102 Flagler Plaza Dr., Palm Coast, FL 32137</p>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                  For App Store Connect &amp; Google Play Console inquiries: <code className="text-cyan-400 font-mono text-[10px]">https://myproproducts.com/readyhub/privacy</code>
                </p>
              </div>
            </div>

          </div>

          {/* Footer Controls */}
          <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Apple App Store Review Guidelines &bull; Google Play User Data Compliant
            </span>
            <div className="flex items-center space-x-2 ml-auto">
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Share URL'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md shadow-cyan-950/50"
              >
                Done
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// In-Page Dedicated Privacy & Store Compliance Card for MyProReadyHubWebsite
export function MyProReadyHubPrivacySection({ onOpenFullPolicy }: { onOpenFullPolicy: () => void }) {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyUrl = () => {
    const url = 'https://myproproducts.com/readyhub/privacy';
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div id="readyhub-privacy-policy" className="mt-16 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 text-left relative overflow-hidden">
      <div className="absolute top-0 right-0 h-36 w-36 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-800/50 uppercase tracking-wider">
              <Shield className="h-3 w-3" />
              <span>Apple &amp; Google Store Verified</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">App Privacy Policy</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight font-nunito">
            MyPro Ready Hub Privacy &amp; Data Protection
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Engineered to meet and exceed Apple App Store Review Guidelines (Sec 5.1) and Google Play Store User Data Policies. Your disaster preparedness data remains private, encrypted, and on-device.
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={handleCopyUrl}
            className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-cyan-400" />}
            <span>{copiedUrl ? 'Copied Store URL' : 'Copy Store Policy URL'}</span>
          </button>
          <button
            onClick={onOpenFullPolicy}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-cyan-950"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Read Full Policy</span>
          </button>
        </div>
      </div>

      {/* 4 Pillars of Store Compliance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <div className="p-2 bg-cyan-950/60 text-cyan-400 rounded-lg w-fit">
            <Camera className="h-4 w-4" />
          </div>
          <h4 className="text-xs font-bold text-white">On-Device AI Video Scans</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Room inventory video frames are processed locally. Footage is never uploaded to public AI training corpuses or sold to third parties.
          </p>
        </div>

        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <div className="p-2 bg-cyan-950/60 text-cyan-400 rounded-lg w-fit">
            <Lock className="h-4 w-4" />
          </div>
          <h4 className="text-xs font-bold text-white">AES-256 Vaulted Storage</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Homeowner deeds, insurance policies, and family medical prescriptions are encrypted with AES-256 and accessible offline during outages.
          </p>
        </div>

        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <div className="p-2 bg-cyan-950/60 text-cyan-400 rounded-lg w-fit">
            <MapPin className="h-4 w-4" />
          </div>
          <h4 className="text-xs font-bold text-white">Zero Tracking / Coarse Alerts</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Weather and FEMA alerts rely solely on user-selected ZIP codes. We never perform continuous background GPS tracking or share location data.
          </p>
        </div>

        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
          <div className="p-2 bg-rose-950/60 text-rose-400 rounded-lg w-fit">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <h4 className="text-xs font-bold text-white">Profile &rarr; Delete Account</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            In compliance with Apple Guideline 5.1.1(v) &amp; Google User Data Policy, tap <strong>Profile &rarr; Delete Account</strong> in-app for instant data purge, or submit online via https://myproproducts.com/readyhub/privacy.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="text-cyan-400 font-semibold">Store Submission &amp; Deletion URL:</span>
          <code className="text-slate-200 font-mono text-[11px] bg-slate-950 px-2.5 py-1 rounded border border-slate-800 font-bold select-all">
            https://myproproducts.com/readyhub/privacy
          </code>
        </div>
        <div>
          <span>Questions? Contact Compliance: </span>
          <a href="mailto:jruland@myproproducts.com" className="text-cyan-400 hover:underline font-semibold">jruland@myproproducts.com</a>
        </div>
      </div>
    </div>
  );
}
