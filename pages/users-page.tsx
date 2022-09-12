import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Section } from '../section';
import { Styles } from '../styles';
import { usersQueryGQL } from '../graphql/querys';
import { client } from '../services/apollo';
import { useLazyQuery } from '@apollo/client';

export const UsersPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [usersQuery, {data, error}] = useLazyQuery(usersQueryGQL,
    {
      client: client, 
      onError: () => {
        console.log(error);
      }
    }
  );

  useEffect(() => {
    usersQuery();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Lista de Usuários"/>
          <FlatList 
            data={data?.users.nodes}
            renderItem={({item}) => (
              <Text style={Styles.userList}>
                Usuário: {item.name}{'\n'}
                Email: {item.email}
              </Text>
            )}
            keyExtractor={(item) => item.id}
          /> 
      </View>
    </SafeAreaView>
  );
};
