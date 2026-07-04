import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Lock, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#468CDC]/10 text-[#468CDC] rounded-lg">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Privacy Policy</h3>
                <p className="text-xs text-slate-500 mt-0.5">Last updated: July 2026</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-grow text-slate-600 space-y-5 text-xs leading-relaxed text-left">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">1. Overview and Commitment</h4>
              <p>
                At MyPro Products and MyPro Market (referred to as "MyPro", "we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share information in connection with our website (myproproducts.com), software applications, and dispatch notification services.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">2. Information We Collect</h4>
              <p className="mb-2">
                We collect information directly from you when you request a demo, register for an account, or opt-in to receive notifications:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Identity Information:</strong> Name, professional role, and company name.</li>
                <li><strong>Contact Information:</strong> Email address and mobile phone number.</li>
                <li><strong>Log and Usage Data:</strong> IP address, device specifications, and interactions with our portal.</li>
              </ul>
            </div>

            {/* CRITICAL SMS DISCLOSURE SECTION FOR TOLL-FREE VERIFICATION */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center space-x-2 text-[#468CDC] font-bold">
                <Shield className="h-4.5 w-4.5" />
                <h4 className="text-xs uppercase tracking-wider">SMS and Mobile Phone Privacy Protection</h4>
              </div>
              <p className="text-slate-700 font-medium">
                MyPro is strictly committed to safeguarding your mobile data and communication consent.
              </p>
              <p className="text-slate-600">
                <strong>No mobile information or phone numbers collected for SMS/text messaging notifications and alerts, and the associated consent, will be shared, rented, or sold with third parties, affiliates, or partners for marketing or promotional purposes under any circumstances.</strong>
              </p>
              <p className="text-slate-600">
                All of the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties or affiliates. Phone numbers collected for SMS subscription remain purely within our internal systems to deliver active dispatch and job notifications.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">3. How We Use Your Information</h4>
              <p className="mb-2">
                We use the information we collect to operate, manage, and audit our B2B dispatch and claims network, specifically:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>To route claims and dispatches to qualified local field contractors.</li>
                <li>To send transactional and informational notifications (including SMS) to homeowners and property managers regarding contractor assignment and claim status updates.</li>
                <li>To verify state trade licenses, general liability coverage, and background checks.</li>
                <li>To deliver custom platform demonstrations and project cost analysis.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">4. Data Security and Retention</h4>
              <p>
                We implement robust administrative, technical, and physical security measures to protect your personal information against unauthorized access, loss, or alteration. We retain your information for as long as necessary to fulfill the operational requirements of active claim dispatches, after which it is securely archived or deleted.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">5. Your Choices and Opt-Out Rights</h4>
              <p>
                You may access, update, or request the deletion of your contact details at any time. For our SMS notification program, you can immediately opt-out of receiving further automated text alerts by replying <strong>STOP</strong> to any message received.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">6. Contact and Support</h4>
              <p className="mb-2">
                If you have any questions, concerns, or requests regarding this Privacy Policy, your personal data, or our mobile program practices, please do not hesitate to contact our dedicated support team:
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2 text-slate-700">
                <p><strong>General Support Email:</strong> <a href="mailto:jruland@myproproducts.com" className="text-[#468CDC] hover:underline font-semibold">jruland@myproproducts.com</a></p>
                <p><strong>Compliance & Privacy Officer:</strong> <a href="mailto:jruland@myproproducts.com" className="text-[#468CDC] hover:underline font-semibold">jruland@myproproducts.com</a></p>
                <p><strong>Toll-Free Support Hotline:</strong> <span className="font-semibold text-slate-900">(833) 369-7762</span></p>
                <p><strong>Support Availability:</strong> Monday – Friday, 9:00 AM to 5:00 PM Eastern Standard Time (EST)</p>
                <p><strong>Mailing Address:</strong> MyPro Products Compliance Office, 102 Flagler Plaza Dr., Palm Coast, FL 32137</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#468CDC] hover:bg-[#3b7cbd] text-white !text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function TermsOfServiceModal({ isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#468CDC]/10 text-[#468CDC] rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Terms of Service</h3>
                <p className="text-xs text-slate-500 mt-0.5">Last updated: July 2026</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-grow text-slate-600 space-y-5 text-xs leading-relaxed text-left">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">1. Agreement to Terms</h4>
              <p>
                By accessing or using the services provided by MyPro Products and MyPro Market ("Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access or use the Services.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">2. Scope of Services</h4>
              <p>
                MyPro provides a B2B network suite connecting insurance carriers, property managers, property owners, and field contractors. MyPro facilitates automated loss intakes, programmatic dispatches, vendor compliance audits, and billing reports. MyPro does not directly perform property repairs or restoration.
              </p>
            </div>

            {/* CRITICAL SMS PROGRAM TERMS OF SERVICE SECTION */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 leading-relaxed">
              <div className="flex items-center space-x-2 text-[#468CDC] font-bold">
                <CheckCircle2 className="h-4.5 w-4.5" />
                <h4 className="text-xs uppercase tracking-wider">SMS / Mobile Alert Program Terms</h4>
              </div>
              <p className="text-slate-700">
                MyPro Market operates a mobile notification program to coordinate contractor dispatches and active claim status updates.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>
                  <strong>Opt-In and Consent:</strong> By explicitly checking the SMS consent box on our registration forms and providing your mobile phone number, you agree to receive automated informational text messages (SMS) from MyPro Market. Consent is entirely optional and is not a condition of purchase or service eligibility.
                </li>
                <li>
                  <strong>Message Types:</strong> Messages will contain critical contractor dispatches (e.g. contractor name and arrival notice), active job coordination updates, and completion notifications.
                </li>
                <li>
                  <strong>Message Frequency:</strong> Message frequency varies based on active property claims and active dispatches associated with your account.
                </li>
                <li>
                  <strong>Pricing & Rates:</strong> MyPro Market does not charge for mobile notifications. However, standard message and data rates may apply from your wireless carrier.
                </li>
                <li>
                  <strong>Opt-Out Instruction:</strong> You can unsubscribe from text alerts at any time. Simply reply <strong>STOP</strong> to any message received. A final confirmation SMS will be sent to confirm your unsubscription, and no further text messages will be sent to your device.
                </li>
                <li>
                  <strong>Assistance:</strong> For assistance or program questions, reply <strong>HELP</strong> to any message, or email us at jruland@myproproducts.com.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">3. User Responsibilities</h4>
              <p>
                Users must provide accurate, current, and complete mobile numbers and contact info. If you transfer or deactivate your mobile phone number, you must update your MyPro account immediately to prevent communication from being routed to an incorrect recipient.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">4. Disclaimers and Limitations of Liability</h4>
              <p>
                Mobile delivery is subject to transmission over wireless networks and is not 100% guaranteed. MyPro is not liable for delayed or undelivered messages. We provide the platform on an "as-is" and "as-available" basis, without any warranties of any kind.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">5. Governing Law</h4>
              <p>
                These Terms of Service and any dispute arising in connection with our services will be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law principles.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">6. Contact and Support</h4>
              <p className="mb-2">
                For questions about our terms, mobile subscription alerts, or general platform inquiries, please contact our support team:
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2 text-slate-700">
                <p><strong>General Support Email:</strong> <a href="mailto:jruland@myproproducts.com" className="text-[#468CDC] hover:underline font-semibold">jruland@myproproducts.com</a></p>
                <p><strong>Compliance & Privacy Officer:</strong> <a href="mailto:jruland@myproproducts.com" className="text-[#468CDC] hover:underline font-semibold">jruland@myproproducts.com</a></p>
                <p><strong>Toll-Free Support Hotline:</strong> <span className="font-semibold text-slate-900">(833) 369-7762</span></p>
                <p><strong>Support Availability:</strong> Monday – Friday, 9:00 AM to 5:00 PM Eastern Standard Time (EST)</p>
                <p><strong>Mailing Address:</strong> MyPro Products Compliance Office, 102 Flagler Plaza Dr., Palm Coast, FL 32137</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#468CDC] hover:bg-[#3b7cbd] text-white !text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
