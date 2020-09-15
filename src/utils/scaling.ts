import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const baseWith = 360;
const baseHeight = 640;

const horizontalScale = (size: number) => (shortDimension / baseWith) * size;
const verticalScale = (size: number) => (longDimension / baseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export const hs = horizontalScale;
export const vs = verticalScale;
export const ms = moderateScale;
