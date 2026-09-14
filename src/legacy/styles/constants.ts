// @ts-nocheck
// orientations
export const portrait = '(orientation: portrait)';
export const landscape = '(orientation: landscape)';

// breakpoints
export const tabletWidth = 768;
export const desktopWidth = 1025;

// media queries
export const iphone7Width = '(max-width: 375px)';
export const smallMobile = '(max-width: 425px)';
export const noTablet = '(max-width: 767px)';
export const tablet = `(min-width: ${tabletWidth}px)`;
export const noDesktop = '(max-width: 1024px)';
export const desktop = `(min-width: ${desktopWidth}px)`;
export const large = '(min-width: 1200px)';
export const noLarge = '(max-width: 1199px)';

// header
// export const mobileHeaderHeight = 100;

// colors
export const black = '#000';
export const raisinBlack = '#292929';
export const lightBlack = '#151515';
export const semiGrey = '#333333';
export const darkGrey = '#565656';
export const grey = '#8E8E93';
export const silver = '#B3B3B3';
export const lightGrey = '#D1D1D6';
export const platinum = '#E5E5EA';
export const greySmoke = '#e4e4e9';
export const white = '#FFF';
export const lessWhite = '#EFEFEF';

export const red = '#FF3B30';
export const yellow = '#FFCC00';
export const green = '#4CD954';
export const teal = '#5AC8FA';
export const blue = '#007AFF';
export const purple = '#5856D6';
export const pink = '#ff3b30';

export const hoverColor = 'rgba(134, 135, 138, 0.85)';

// gradients
// export const defaultHomeBg = 'linear-gradient(180deg, #111 0%, #777 100%)';
export const defaultHomeBg = '#000000';

// fonts
export const fontFamily = 'Coco Gothic, Arial, sans-serif';

export const cocoRegular: Record<string, string> = {
  fontFamily,
  fontWeight: 'normal',
  fontStyle: 'normal',
};

export const cocoBold: Record<string, string> = {
  fontFamily,
  fontWeight: 'bold',
  fontStyle: 'normal',
};

export const cocoBlack: Record<string, string> = {
  fontFamily,
  fontWeight: '900',
  fontStyle: 'normal',
};

// mixins
export const AbsoluteCenter: Record<string, string> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
