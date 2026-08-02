import React from 'react';
import { Facebook, Twitter, Share2, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, text, url = window.location.href, className = "" }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4" />,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#128C7E]'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#0d65d9]'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-[#1DA1F2] hover:bg-[#0c85d0]'
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.color} text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-sm`}
          title={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="bg-zinc-800 text-white p-2 rounded-full hover:bg-zinc-900 transition-all duration-300 hover:scale-110 shadow-sm"
          title="Other sharing options"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ShareButtons;
