import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';
import {getThemeColors} from 'utils';

export const Heart = ({
  width = 22,
  height = 19,
  color = getThemeColors()?.primary as string,
  testID = '',
}: SvgProps & {testID?: string}) => {
  return (
    <Svg
      testID={testID}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none">
      <Path
        d="M19.0469 1.96094C21.5078 4.07031 21.625 7.82031 19.4375 10.0859L11.8594 17.8984C11.3906 18.4062 10.5703 18.4062 10.1016 17.8984L2.52344 10.0859C0.335938 7.82031 0.453125 4.07031 2.91406 1.96094C5.0625 0.125 8.26562 0.476562 10.2188 2.50781L11 3.28906L11.7422 2.50781C13.7344 0.476562 16.8984 0.125 19.0469 1.96094Z"
        fill={color}
      />
    </Svg>
  );
};
