import React from 'react';
import { FaCopy, FaShareAlt, FaQrcode } from 'react-icons/fa';

const ShortenModal = ({ open, shortUrl, onClose }) => {
  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: shortUrl });
    } else {
      alert('Share not supported on this browser.');
    }
  };

  const handleQr = () => {
    // Replace with your QR code generator link
    window.open(`https://www.qrcode-monkey.com/?data=${encodeURIComponent(shortUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-[#2d112b]">Shortened Link</h2>
        <input type="text" value={shortUrl} readOnly className="w-full p-3 mb-4 border-1 border-[#974091] rounded-xl text-lg text-center" />
        <div className="flex gap-3 w-full justify-center">
          <button onClick={handleCopy} className="flex gap-1 items-center px-3 py-1.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"><FaCopy size={14} /> Copy</button>
          <button onClick={handleShare} className="flex gap-1 items-center px-3 py-1.5 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"><FaShareAlt size={14} /> Share</button>
          <button onClick={handleQr} className="flex gap-1 items-center px-3 py-1.5 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition"><FaQrcode size={14}/> QR Code</button>
          <button onClick={onClose} className="flex gap-1 items-center px-3 py-1.5 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ShortenModal;
