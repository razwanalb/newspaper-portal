import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Printer, 
  Mail, 
  CheckCircle2, 
  Navigation,
  Share2,
  Maximize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface ContactViewProps {
  onGoHome: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onGoHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mapZoom, setMapZoom] = useState(15);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full py-8">
      {/* Header & Back to home link matching screenshot 8 */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 mb-8">
        <h1 className="font-serif-headline text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50">
          Contact Us
        </h1>
        <button
          onClick={onGoHome}
          className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-widest hover:underline"
        >
          <span>Back To Home</span>
          <span>→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (6 cols): Send Us A Message Form & Details */}
        <div className="lg:col-span-6">
          <h2 className="font-serif-headline text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            Send Us A Message
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
            Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc. Maecenas nec odio et ante.
          </p>

          {/* Contact Details List matching screenshot 8 */}
          <div className="space-y-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 mb-8 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
              <span>01 Central Park, US, New York City</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
              <span>Phone: (012) 345 6789</span>
            </div>
            <div className="flex items-center gap-3">
              <Printer className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
              <span>Fax: (012) 345 6789</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
              <span>Email: pencidesign@gmail.com</span>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-2 mb-2 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Message Received</span>
              </div>
              <p className="text-xs sm:text-sm">
                Thank you, <strong>{name}</strong>! Your inquiry regarding "{subject}" has been routed to our newsroom editorial desk. We typically respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-emerald-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name*"
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-none focus:outline-none focus:border-red-600"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email*"
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-none focus:outline-none focus:border-red-600"
                />
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject*"
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-none focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message"
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-none focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-neutral-200 hover:bg-neutral-900 hover:text-white dark:bg-neutral-800 dark:hover:bg-red-600 text-neutral-900 dark:text-neutral-100 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                SUBMIT
              </button>
            </form>
          )}
        </div>

        {/* Right Column (6 cols): London Eye Map Card matching screenshot 8 & 9 */}
        <div className="lg:col-span-6">
          <div className="relative w-full h-[450px] border border-neutral-300 dark:border-neutral-700 rounded overflow-hidden shadow-xs bg-slate-100 dark:bg-neutral-800">
            {/* Map Canvas with London Eye Pin overlay */}
            <div className={`w-full h-full relative ${mapType === 'satellite' ? 'bg-slate-900' : 'bg-[#e5e3df]'}`}>
              {/* Illustrated Map Background */}
              <iframe
                title="London Eye Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.546419163283!2d-0.12211422340320496!3d51.50332401103632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk"
                className="w-full h-full border-0 grayscale-[20%] dark:invert-[90%] dark:hue-rotate-180"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Information Pop-up Card matching screenshot 8 */}
              <div className="absolute top-4 left-4 max-w-xs bg-white dark:bg-neutral-900 p-4 rounded shadow-lg border border-neutral-200 dark:border-neutral-800 z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      London Eye
                    </h3>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                      Riverside Building, County Hall, Westminster Bridge Rd, London SE1 7PB, UK
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">4.5</span>
                  <div className="flex text-amber-500 text-[10px]">
                    ★★★★★
                  </div>
                  <span className="text-[11px] text-neutral-400">(204,690)</span>
                </div>

                <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                  <a
                    href="https://maps.google.com/?q=London+Eye"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=London+Eye"
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-600 dark:text-neutral-400 hover:underline"
                  >
                    View larger map
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
