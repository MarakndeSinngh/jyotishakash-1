import React, { useState, useEffect } from 'react';
import { X, User, Calendar, Phone, Sparkles } from 'lucide-react';
import { PersonalDetails } from '../types';
import DateInput from './DateInput';

interface QuickProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (details: PersonalDetails) => void;
  initialDetails?: PersonalDetails | null;
  currentProfile?: PersonalDetails | null;
  [key: string]: any;
}

export const QuickProfileModal: React.FC<QuickProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDetails,
  currentProfile
}) => {
  const effective = initialDetails || currentProfile;
  const [name, setName] = useState(effective?.name || '');
  const [dob, setDob] = useState(effective?.dob || '');
  const [gender, setGender] = useState(initialDetails?.gender || 'MALE');
  const [mobile, setMobile] = useState(initialDetails?.mobile || '');

  useEffect(() => {
    if (initialDetails) {
      setName(initialDetails.name || '');
      setDob(initialDetails.dob || '');
      setGender(initialDetails.gender || 'MALE');
      setMobile(initialDetails.mobile || '');
    }
  }, [initialDetails]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob) return;
    onSave({
      name: name.trim(),
      dob,
      gender,
      mobile: mobile.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#D97706] flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-playfair text-slate-800">
              प्रोफाइल विवरण (Profile Details)
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              सटीक अंकशास्त्रीय गणना के लिए आवश्यक जानकारी दर्ज करें
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              पूरा नाम (Full Name) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Raajeev Singh Chauhann"
              required
              className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706]/40"
            />
          </div>

          <DateInput
            label="जन्म तिथि (Date of Birth)"
            value={dob}
            onChange={setDob}
            required
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              लिंग (Gender)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('MALE')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  gender === 'MALE' ? 'bg-[#143D2E] text-amber-200 border-[#C6A15B]' : 'bg-slate-50 text-slate-600'
                }`}
              >
                पुरुष (Male)
              </button>
              <button
                type="button"
                onClick={() => setGender('FEMALE')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  gender === 'FEMALE' ? 'bg-[#143D2E] text-amber-200 border-[#C6A15B]' : 'bg-slate-50 text-slate-600'
                }`}
              >
                महिला (Female)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              मोबाइल नंबर (Mobile Number)
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md"
          >
            प्रोफाइल सहेजें एवं विश्लेषण करें (Save & Audit)
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickProfileModal;
