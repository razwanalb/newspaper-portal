import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8"
        role="dialog"
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            <h2 className="font-serif-headline text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-red-600 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif-headline max-h-[60vh] overflow-y-auto pr-2">
          <p>
            Welcome to the official legal and governance documentation of <strong>The Soledad Times</strong>. As an independent newspaper and magazine publication, we are committed to journalism of the highest integrity and rigorous protection of user privacy.
          </p>

          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mt-4">
            1. Editorial Standards & Data Integrity
          </h3>
          <p>
            Our journalists adhere to strict factual verification. We do not sell personal identification credentials to third-party data brokers. All readership telemetry collected through newsletter submissions is securely stored in accordance with strict security standards.
          </p>

          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mt-4">
            2. Accessibility & Universal Usability
          </h3>
          <p>
            The Soledad Times is committed to facilitating full accessibility across our digital web experiences for all readers with disabilities, implementing WCAG 2.1 AA compliant color contrast, screen reader landmarks, and keyboard navigation.
          </p>

          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mt-4">
            3. Inquiries & Representation
          </h3>
          <p>
            For syndication requests, advertising partnerships, or corrections, contact our newsroom at <strong>pencidesign@gmail.com</strong> or call <strong>(012) 345 6789</strong>.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-neutral-900 hover:bg-red-600 dark:bg-neutral-100 dark:hover:bg-red-600 text-white dark:text-neutral-900 dark:hover:text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
