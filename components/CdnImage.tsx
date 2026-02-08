import { Image as IkImage } from '@imagekit/next';
import type React from 'react';
import NextImage from 'next/image';

import type { ImageKitTransform } from '@/lib/imagekit';

type IkProps = React.ComponentProps<typeof IkImage>;

type Props = Omit<IkProps, 'urlEndpoint' | 'transformation'> & {
  urlEndpoint?: string;
  transform?: ImageKitTransform;
};

export default function CdnImage({ src, transform, urlEndpoint, quality, ...props }: Props) {
  const resolvedEndpoint = urlEndpoint ?? process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  const normalizedQuality = typeof quality === 'string' ? Number(quality) : quality;

  const isAbsoluteUrl = /^https?:\/\//i.test(String(src));

  if (!resolvedEndpoint || isAbsoluteUrl) {
    return <NextImage src={src as unknown as string} quality={quality as unknown as number} {...(props as any)} />;
  }

  return (
    <IkImage
      urlEndpoint={resolvedEndpoint}
      src={src}
      transformation={[
        {
          width: transform?.w,
          height: transform?.h,
          quality: transform?.q ?? normalizedQuality,
          format: transform?.f ?? 'auto',
        },
      ]}
      {...props}
    />
  );
}
