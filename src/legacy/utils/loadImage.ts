// @ts-nocheck
export default (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement('img');

    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = src;
  });
};
