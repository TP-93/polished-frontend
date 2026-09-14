// @ts-nocheck
const getCartModalImages = (groups: any) => {
  const cartModalImages: { front: any; back: any } = {
    front: '#',
    back: '#',
  };

  const groupData = groups && groups[0];
  const images = groupData && groupData?.images;

  const back = images && images[1];
  const front = images && images[0];

  if (groupData && images?.length) {
    cartModalImages.back = back?.url;
    cartModalImages.front = front?.url;
  }

  if (!images?.length) {
    cartModalImages.back = '';
    cartModalImages.front = groupData?.url;
  }

  return cartModalImages;
};

export default getCartModalImages;
