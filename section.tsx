import {
    Text,
    useColorScheme,
    View,
  } from 'react-native';
  import { Styles } from './styles';
  import { Colors } from 'react-native/Libraries/NewAppScreen';
  import React, {PropsWithChildren } from 'react';

export const Section: React.FC<PropsWithChildren<{ title: string; }>> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={Styles.sectionContainer}>
      <Text
        style={[
          Styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text style={[Styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark }]}>
        {children}
      </Text>
    </View>
  );
};