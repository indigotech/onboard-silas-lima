import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Section } from '../section';
import { useQuery } from '@apollo/client';
import { client } from '../services/apollo';
import { userQueryGQL } from '../graphql/querys';
import { Styles } from '../styles';

export const UserDetailPage = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {data, loading, error} = useQuery(userQueryGQL,
    {
      client: client,
      variables: {input: props.id},
      onError: () => {
        console.log(error);
      },
    }
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Dados do Usuário"/>
          {loading &&  <ActivityIndicator></ActivityIndicator>}
          <Text style={Styles.inputTitle}> Nome</Text>
          <Text style={Styles.userInfoContainer}>{data?.user.name}</Text>

          <Text style={Styles.inputTitle}> E-mail </Text>
          <Text style={Styles.userInfoContainer}>{data?.user.email}</Text>

          <Text style={Styles.inputTitle}> Telefone </Text>
          <Text style={Styles.userInfoContainer}>{data?.user.phone}</Text>
          
          <Text style={Styles.inputTitle}> Data de Nascimento </Text>
          <Text style={Styles.userInfoContainer}>{data?.user.birthDate}</Text>
          
          <Text style={Styles.inputTitle}> Cargo </Text>
          <TouchableOpacity 
            disabled = {true}
            style={{
              ...Styles.roleSelector, 
              backgroundColor: data?.user.role == "admin" ? "black": "white"
            }}
          >
            <Text style={{color: data?.user.role == "admin" ? "white": "black"}}>
              Administrador
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            disabled = {true}
            style={{
              ...Styles.roleSelector, 
              backgroundColor: data?.user.role == "user" ? "black": "white"
            }}
          >
            <Text style={{color: data?.user.role == "user" ? "white": "black"}}>
              Usuário
            </Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};