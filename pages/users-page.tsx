import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Section } from '../section';
import { Users } from '../mock';
import { Styles } from '../styles';

export const UsersPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Lista de Usuários"/>
          <FlatList 
            data={Users}
            renderItem={({item}) => (
                <Text style={Styles.userList}>
                  Usuário: {item.username}{'\n'}
                  Email: {item.email}
                </Text>
            )}
          />
      </View>
    </SafeAreaView>
  );
};
