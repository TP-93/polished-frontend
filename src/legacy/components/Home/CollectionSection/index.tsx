// @ts-nocheck
import { Stack as Stack } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import Image from './Image';
import Video from './Video';
import RelatedProducts from './RelatedProducts';

interface Props {
  section: any;
}

export default function CollectionSection({ section }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    video,
    videoMobile,
    sectionText,
    sectionLink,
    backgroundImage,
    backgroundImageMobile,
  } = section || {};

  const properties: any = {
    imageUrl: '',
    videoUrl: '',
  };

  if (isMobile) {
    if (videoMobile) {
      properties.videoUrl = videoMobile;
    } else if (!videoMobile && backgroundImageMobile) {
      properties.imageUrl = backgroundImageMobile;
    }
  }

  if (!isMobile) {
    if (video) {
      properties.videoUrl = video;
    } else if (!video && backgroundImage) {
      properties.imageUrl = backgroundImage;
    }
  }

  return (
    <Stack display="flex" flexDirection="column">
      {!properties.videoUrl.length && properties.imageUrl.length > 0 && (
        <Image
          imageUrl={properties.imageUrl}
          sectionText={sectionText || ''}
          sectionLink={sectionLink || ''}
        />
      )}

      {properties.videoUrl.length > 0 && (
        <Video videoLink={properties.videoUrl} />
      )}

      <RelatedProducts products={section.products} />
    </Stack>
  );
}
