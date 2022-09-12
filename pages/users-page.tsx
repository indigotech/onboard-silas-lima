import React from 'react';
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
import { useQuery } from '@apollo/client';

export const UsersPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function UsersQuery() {
    const { loading, error, data } = useQuery(usersQueryGQL, { client: client });
  
    if (loading) {
      return <ActivityIndicator/>;
    }
    if (error) {
      return <Text style={Styles.errorMessage}>`Erro! ${error.message}`</Text>;
    }
    return (
      <FlatList 
        data={data.users.nodes}
        renderItem={({item}) => (
            <Text style={Styles.userList}>
              Usuário: {item.name}{'\n'}
              Email: {item.email}
            </Text>
        )}
      />
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Lista de Usuários"/>
          <UsersQuery/>
      </View>
    </SafeAreaView>
  );
};
