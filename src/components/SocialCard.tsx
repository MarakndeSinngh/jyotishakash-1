import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Facebook, ArrowUpRight, Play, CheckCircle2, Globe, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { BrandRegistry } from '../config/brandRegistry';
import { YoutubeThumbnail } from './common/YoutubeThumbnail';
import { useVideoLightbox } from './common/VideoLightbox';

interface SocialCardProps {
  url: string;
  customTitle?: string;
  customDescription?: string;
  customAvatar?: string;
  customBanner?: string;
}

export const SocialCard: React.FC<SocialCardProps> = ({
  url,
  customTitle,
  customDescription,
  customAvatar,
  customBanner
}) => {
  const [imgError, setImgError] = useState(false);

  // Retrieve central metadata
  const registrySocial = BrandRegistry.social;
  const brand = BrandRegistry.brand;
  const assets = BrandRegistry.assets;

  // Determine platform type
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
  const isFacebook = url.includes('facebook.com');
  const isInstagram = url.includes('instagram.com');
  const isLinkedin = url.includes('linkedin.com');
  const isWhatsapp = url.includes('wa.me') || url.includes('whatsapp.com');
  const isVideo = url.includes('watch?v=') || url.includes('shorts/') || url.includes('youtu.be/') || url.includes('embed/') || url.includes('playlist?list=');

  let title = customTitle || '';
  let description = customDescription || '';
  let avatar = customAvatar || '';
  let banner = customBanner || '';
  let statsText = '';
  let badgeText = 'Official Link';
  let isVerified = false;
  let brandColor = BrandRegistry.theme.primary;
  let hoverColor = BrandRegistry.theme.secondary;
  let platformName = 'LEO Link';

  // Smart matching of registry social records
  const matchedSocial = registrySocial.find(s => {
    try {
      const u1 = new URL(s.url).pathname.toLowerCase();
      const u2 = new URL(url).pathname.toLowerCase();
      return u1 === u2 || url.toLowerCase().includes(s.username.toLowerCase());
    } catch {
      return url.toLowerCase().includes(s.username.toLowerCase());
    }
  });

  if (isYoutube) {
    platformName = 'YouTube';
    brandColor = '#FF0000';
    hoverColor = '#CC0000';
    if (isVideo) {
      // YouTube Video Preview
      title = title || "Premium Spiritual Session Video";
      description = description || "Watch Raajeev Singh Chauhann sharing direct Vedic calculations, gemstone advice, and Astro insights.";
      
      let videoId = '';
      if (url.includes('shorts/')) {
        videoId = url.split('shorts/')[1]?.split('?')[0];
      } else if (url.includes('v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      }
      
      banner = banner || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : assets.videoCovers.short);
      avatar = avatar || assets.logos.symbol;
      statsText = matchedSocial ? matchedSocial.followers : "Official Video Channel";
      badgeText = "Official Video";
    } else {
      // YouTube Channel Preview
      if (matchedSocial) {
        title = title || matchedSocial.displayName;
        description = description || matchedSocial.description;
        avatar = avatar || matchedSocial.thumbnail;
        banner = banner || matchedSocial.banner;
        statsText = matchedSocial.followers || matchedSocial.subscribers;
        isVerified = matchedSocial.verified;
        badgeText = "Verified Channel";
      } else {
        title = title || `${brand.name} Occult Gyan`;
        description = description || "Official channel for occult masterclasses and remedial updates.";
        avatar = avatar || assets.logos.symbol;
        banner = banner || assets.backgroundImages.luxury;
        statsText = "120K+ Seekers";
        badgeText = "Official Channel";
      }
    }
  } else if (isFacebook) {
    platformName = 'Facebook';
    brandColor = '#1877F2';
    hoverColor = '#165EBF';
    if (matchedSocial) {
      title = title || matchedSocial.displayName;
      description = description || matchedSocial.description;
      avatar = avatar || matchedSocial.thumbnail;
      banner = banner || matchedSocial.banner;
      statsText = matchedSocial.followers;
      isVerified = matchedSocial.verified;
      badgeText = "Official Page";
    } else {
      title = title || `${brand.founder} Community`;
      description = description || "Direct community interactions, daily calculation posts, and global remedial discussion.";
      avatar = avatar || assets.founderPhotos.portrait;
      banner = banner || assets.backgroundImages.luxury;
      statsText = "65K+ Followers";
      badgeText = "Verified Page";
    }
  } else if (isInstagram) {
    platformName = 'Instagram';
    brandColor = '#E1306C';
    hoverColor = '#C13584';
    if (matchedSocial) {
      title = title || matchedSocial.displayName;
      description = description || matchedSocial.description;
      avatar = avatar || matchedSocial.thumbnail;
      banner = banner || matchedSocial.banner;
      statsText = matchedSocial.followers;
      badgeText = "Coming Soon";
    } else {
      title = title || `${brand.name} Instagram`;
      description = description || "Daily numerology insights, gemstone alignment cards, and spiritual wisdom.";
      avatar = avatar || assets.logos.symbol;
      banner = banner || assets.backgroundImages.starry;
      statsText = "Coming Soon";
      badgeText = "Social Feed";
    }
  } else if (isLinkedin) {
    platformName = 'LinkedIn';
    brandColor = '#0A66C2';
    hoverColor = '#004182';
    if (matchedSocial) {
      title = title || matchedSocial.displayName;
      description = description || matchedSocial.description;
      avatar = avatar || matchedSocial.thumbnail;
      banner = banner || matchedSocial.banner;
      statsText = matchedSocial.followers;
    } else {
      title = title || `${brand.name} LinkedIn`;
      description = description || "Corporate spatial energetics, organizational alignments, and leadership coaching.";
      avatar = avatar || assets.logos.symbol;
      banner = banner || assets.backgroundImages.luxury;
      statsText = "Professional Feed";
    }
    badgeText = "Corporate";
  } else if (isWhatsapp) {
    platformName = 'WhatsApp';
    brandColor = '#25D366';
    hoverColor = '#128C7E';
    title = title || `${brand.name} WhatsApp Community`;
    description = description || "Receive real-time remedial updates, planetary transit calculations, and exclusive webinar invites directly.";
    avatar = avatar || assets.logos.symbol;
    banner = banner || assets.backgroundImages.glow;
    statsText = "Active Support Link";
    badgeText = "Direct Chat";
  } else {
    // Website properties or generic fallbacks
    const matchedWeb = Object.values(BrandRegistry.websites).find(w => url.includes(w.url) || w.url.includes(url));
    if (matchedWeb) {
      title = title || matchedWeb.name;
      description = description || matchedWeb.description;
      banner = banner || assets.backgroundImages.luxury;
      avatar = avatar || matchedWeb.logo;
      statsText = matchedWeb.category;
      badgeText = "Official Property";
    } else {
      title = title || brand.name;
      description = description || brand.tagline;
      banner = banner || assets.backgroundImages.starry;
      avatar = avatar || assets.logos.symbol;
      statsText = "Official System Link";
      badgeText = "Verified Resource";
    }
  }

  // Fallback system for broken images
  const finalBanner = imgError ? assets.backgroundImages.starry : (banner || assets.backgroundImages.luxury);

  const { openLightbox } = useVideoLightbox();

  const handleClick = (e: React.MouseEvent) => {
    if (isYoutube && isVideo) {
      e.preventDefault();
      openLightbox(url, title, 'LEO Family Video Hub');
    }
  };

  const getPlatformIcon = () => {
    switch (platformName) {
      case 'YouTube':
        return <Youtube className="h-4 w-4 text-red-500 fill-current" />;
      case 'Facebook':
        return <Facebook className="h-4 w-4 text-blue-500 fill-current" />;
      case 'Instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'LinkedIn':
        return <Linkedin className="h-4 w-4 text-[#0A66C2] fill-current" />;
      case 'WhatsApp':
        return <MessageSquare className="h-4 w-4 text-[#25D366] fill-current" />;
      default:
        return <Globe className="h-4 w-4 text-[#C29B47]" />;
    }
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      whileHover={{ y: -6, scale: 1.01 }}
      className="block relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1C0F02]/90 to-[#2A1604]/90 backdrop-blur-xl shadow-2xl transition-all duration-300 group cursor-pointer"
    >
      {/* Top Banner Image with Lazy-loading & Fallback */}
      <div className="relative h-44 w-full overflow-hidden bg-[#120700]">
        {isYoutube ? (
          <YoutubeThumbnail
            url={url}
            aspectRatio="auto"
            className="h-full w-full opacity-80"
            showPlayButton={false}
            hoverEffect={true}
            alt={title}
          />
        ) : (
          <img
            src={finalBanner}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F02] via-[#1C0F02]/40 to-transparent" />
        
        {/* Play Overlay for Videos */}
        {isYoutube && isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C29B47]/90 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#E9C269]">
              <Play className="h-6 w-6 fill-current ml-1 text-[#1C0F02]" />
            </div>
          </div>
        )}

        {/* Platform Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm border border-white/10">
          {getPlatformIcon()}
          <span>{badgeText}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 relative">
        {/* Avatar Profile Overlap */}
        {(!isYoutube || !isVideo) && avatar && (
          <div className="absolute -top-12 right-6 h-16 w-16 overflow-hidden rounded-xl border-2 border-[#C29B47] shadow-lg bg-[#1C0F02]">
            <img
              src={avatar}
              alt="Profile"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = assets.logos.symbol;
              }}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-3">
          {/* Channel / Platform Title */}
          <div className="flex items-center gap-1.5 pr-14">
            <h4 className="font-sans text-base font-bold text-white tracking-wide group-hover:text-[#E9C269] transition-colors duration-300 line-clamp-1">
              {title}
            </h4>
            {isVerified && (
              <CheckCircle2 className="h-4 w-4 text-[#C29B47] fill-current flex-shrink-0" />
            )}
          </div>

          {/* Stats / Followers */}
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#C29B47]/80 font-semibold">
            {statsText}
          </p>

          {/* Description */}
          <p className="text-xs text-stone-300/90 leading-relaxed font-sans line-clamp-2 h-8">
            {description}
          </p>

          {/* Divider */}
          <div className="h-px w-full bg-white/5 pt-1" />

          {/* Bottom CTA */}
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors duration-300">
            <span>
              {isYoutube ? (isVideo ? 'Watch Now' : 'Subscribe Channel') : isFacebook ? 'Connect Community' : 'Visit Hub'}
            </span>
            <div className="flex items-center gap-1 text-[#C29B47] font-sans">
              <span className="text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">OPEN</span>
              <ArrowUpRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gold Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C29B47]/60 to-transparent" />
    </motion.a>
  );
};
