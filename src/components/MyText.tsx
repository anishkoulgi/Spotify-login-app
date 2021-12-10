import React from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {}

const MyText: React.FC<Props> = ({ style, children, ...rest }) => {
  return (
    <Text style={[{ fontFamily: 'Circular-std' }, style]}>{children}</Text>
  );
};

export default MyText;
