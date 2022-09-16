import React from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useQuery } from '@apollo/client';
import { client } from '../services/apollo';
import { userQueryGQL } from '../graphql/querys';
import { Styles } from '../styles';
import { Title, View } from '../styled-components';

export const UserDetailPage = (props: { id: string }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const { data, loading } = useQuery(userQueryGQL, {
    client: client,
    variables: { input: props.id },
    onError: (e) => {
      Alert.alert(e.name, e.message);
    },
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View isDarkMode={isDarkMode}>
        <Title>Dados do Usuário</Title>

        {loading && <ActivityIndicator />}
        <Text style={Styles.inputTitle}> Nome</Text>
        <Text style={Styles.userInfoContainer}>{data?.user.name}</Text>

        <Text style={Styles.inputTitle}> E-mail </Text>
        <Text style={Styles.userInfoContainer}>{data?.user.email}</Text>

        <Text style={Styles.inputTitle}> Telefone </Text>
        <Text style={Styles.userInfoContainer}>{data?.user.phone}</Text>

        <Text style={Styles.inputTitle}> Data de Nascimento </Text>
        <Text style={Styles.userInfoContainer}>{data?.user.birthDate}</Text>

        <Text style={Styles.inputTitle}> Cargo </Text>
        <Text style={Styles.userInfoContainer}>{data?.user.role === 'admin' ? 'Administrador' : 'Usuário'}</Text>
      </View>
    </SafeAreaView>
  );
};
