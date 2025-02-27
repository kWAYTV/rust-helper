import Image from 'next/image';
import { memo } from 'react';

import { rustImages } from '@/constants/rust-images';
import { cn } from '@/lib/utils';

interface RustImageProps {
  imageKey: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const RustImage = memo(function RustImage({
  imageKey,
  alt = '',
  className,
  width = 100,
  height = 100
}: RustImageProps) {
  // Find the image in the rust images categories
  const findImageInCategories = () => {
    for (const category in rustImages) {
      if (Object.prototype.hasOwnProperty.call(rustImages, category)) {
        const categoryImages = rustImages[category as keyof typeof rustImages];
        const image = categoryImages.find(img => img.name === imageKey);
        if (image) {
          return {
            src: image.url,
            alt: image.alt || alt || imageKey
          };
        }
      }
    }

    return {
      src: '/images/placeholder.png',
      alt: alt || imageKey
    };
  };

  const { src, alt: imageAlt } = findImageInCategories();

  return (
    <Image
      src={src}
      alt={imageAlt}
      width={width}
      height={height}
      className={cn('object-contain', className)}
    />
  );
});
