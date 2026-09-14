// @ts-nocheck
/* eslint-disable prefer-destructuring */
export const getMainImageIndexHandler = (images: any, imageSide: string) => {
  let firstImage: any = '';
  let secondImage: any = '';
  let thirdImage: any = '';

  if (images?.length !== 0) {
    firstImage = images[0];
    secondImage = images[1];
    thirdImage = images[2];
  }

  if (images?.length === 0) {
    firstImage = images[0];
    secondImage = images[0];
    thirdImage = images[0];
  }

  let mainUrl = '';

  if (!imageSide) mainUrl = firstImage?.url;

  if (imageSide && imageSide === 'A_1') mainUrl = firstImage?.url;

  if (imageSide && imageSide === 'A_2') mainUrl = secondImage?.url;

  if (imageSide && imageSide === 'A_3') mainUrl = thirdImage?.url;

  const imageIndex = images.findIndex((image: any) => image.url === mainUrl);

  return imageIndex;
};
