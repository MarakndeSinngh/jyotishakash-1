import React, { useState, useEffect } from "react";

interface SmartImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt = "image",
  className = "",
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasFailed(false);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        // Prevent infinite loop if fallback also fails
        if (!hasFailed) {
          setHasFailed(true);
          setImgSrc("/gemstone-assets/logo.jpg");
        }
      }}
      className={className}
    />
  );
};

export default SmartImage;