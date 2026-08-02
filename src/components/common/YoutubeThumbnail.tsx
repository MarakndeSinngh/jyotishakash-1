import React, { useState, useEffect, useRef } from 'react';
import { Play, Youtube, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { parseYoutubeUrl, getFallbackThumbnails, fetchYoutubeArtwork } from '../../utils/youtube';
import { BrandRegistry } from '../../config/brandRegistry';

interface YoutubeThumbnailProps {
  url: string;
  className?: string;
  alt?: string;
  lazy?: boolean;
  priority?: boolean;
  showPlayButton?: boolean;
  hoverEffect?: boolean;
  aspectRatio?: 'video' | 'shorts' | 'square' | 'auto';
}

export const YoutubeThumbnail: React.FC<YoutubeThumbnailProps> = ({
  url,
  className = '',
  alt = 'YouTube Video Thumbnail',
  lazy = true,
  priority = false,
  showPlayButton = true,
  hoverEffect = true,
  aspectRatio = 'video',
}) => {
  const [resolvedUrl, setResolvedUrl] = useState<string>('');
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [fallbackList, setFallbackList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { type, id } = parseYoutubeUrl(url);

  // Synchronously set initial high resolution URL for video/shorts to avoid blank states
  useEffect(() => {
    setFallbackIndex(0);
    setLoading(true);

    if (type === 'video' || type === 'shorts') {
      const list = getFallbackThumbnails(id);
      setFallbackList(list);
      if (list.length > 0) {
        setResolvedUrl(list[0]);
      }
    } else if (type === 'playlist' || type === 'channel') {
      // Fetch playlist or channel artwork asynchronously (cached automatically)
      let active = true;
      fetchYoutubeArtwork(url, id, type).then((artworkUrl) => {
        if (active) {
          setResolvedUrl(artworkUrl);
          setLoading(false);
        }
      });
      return () => {
        active = false;
      };
    } else {
      // Generic fallback
      setResolvedUrl(BrandRegistry.assets?.backgroundImages?.luxury || '/gemstone-assets/background.png');
      setLoading(false);
    }
  }, [url, type, id]);

  // Handle image loading error or 120x90 missing thumbnail placeholder detection
  const handleLoad = () => {
    if (imgRef.current) {
      const img = imgRef.current;
      // YouTube returns a 120x90 image if maxresdefault/sddefault does not exist.
      // If we detect exactly 120x90, it means it is a placeholder/404, so we step down the quality.
      if (img.naturalWidth === 120 && img.naturalHeight === 90) {
        triggerFallback();
      } else {
        setLoading(false);
      }
    }
  };

  const triggerFallback = () => {
    const nextIndex = fallbackIndex + 1;
    if (nextIndex < fallbackList.length) {
      setFallbackIndex(nextIndex);
      setResolvedUrl(fallbackList[nextIndex]);
    } else {
      // End of chain, use official backup
      setResolvedUrl(BrandRegistry.assets?.backgroundImages?.luxury || '/gemstone-assets/background.png');
      setLoading(false);
    }
  };

  const handleError = () => {
    triggerFallback();
  };

  // Class setups based on aspect ratio
  const aspectClass = {
    video: 'aspect-video',
    shorts: 'aspect-[9/16]',
    square: 'aspect-square',
    auto: 'h-full w-full',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden w-full h-full ${aspectClass} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background backing glow/skeletal placeholder */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#120700] via-[#241304] to-[#120700] animate-pulse flex items-center justify-center z-0">
          <Youtube className="w-8 h-8 text-red-600/30 animate-bounce" />
        </div>
      )}

      {/* Main Thumbnail Image */}
      {resolvedUrl && (
        <img
          ref={imgRef}
          src={resolvedUrl}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : lazy ? 'lazy' : 'eager'}
          decoding="async"
          // @ts-ignore
          fetchPriority={priority ? 'high' : 'auto'}
          className={`w-full h-full object-cover transition-all duration-700 ${
            hoverEffect && isHovered ? 'scale-105' : 'scale-100'
          } ${loading ? 'opacity-0 scale-95 blur-md' : 'opacity-85 blur-0'}`}
        />
      )}

      {/* Dark luxury overlay vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none z-10" />

      {/* Premium play/brand indicator overlay */}
      {showPlayButton && (type === 'video' || type === 'shorts' || type === 'playlist') && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.div
            animate={{
              scale: isHovered ? 1.12 : 1.0,
              boxShadow: isHovered
                ? '0 0 25px rgba(233,194,105,0.6)'
                : '0 4px 15px rgba(0,0,0,0.4)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C29B47] text-stone-950 shadow-2xl backdrop-blur-sm pointer-events-none"
          >
            <Play className="h-5 w-5 fill-current ml-0.5 text-stone-950" />
          </motion.div>
        </div>
      )}

      {/* Verified Youtube Mini Badge */}
      {type === 'channel' && (
        <div className="absolute top-4 right-4 z-20 bg-red-600/90 text-white rounded-full p-1 border border-white/20 shadow-md">
          <Youtube className="w-3 h-3 fill-current" />
        </div>
      )}

      {/* Shiny animated line reflection */}
      {hoverEffect && isHovered && (
        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full rotate-12 animate-[shimmer_3s_infinite] pointer-events-none z-10" />
      )}
    </div>
  );
};
