import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { setStorageValue } from '../persistency';
import { loginValidator } from '../regex';
import { client } from '../services/apollo';
import { useMutation } from '@apollo/client';
import { loginMutationGQL } from '../graphql/mutations';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { useState } from 'react';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { ActionButton, ErrorMessage, FormField, Title } from '../styled-components';

export const LoginPage = (props: NavigationComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [authError, setAuthError] = useState(false);
  
  const [loginMutation, {loading, error}] = useMutation(loginMutationGQL, 
    {
      client: client, 
      onCompleted: (data) => {
        setStorageValue('@token', data.login.token);
        Navigation.push(props.componentId, {
          component: {
            name: 'usersPage'
          }
        });
      },
      onError: () => {
        setAuthError(true);
      }
    }
  );
  
  const handleSubmit = () => {
    const validation = loginValidator(email, password);

    setEmailError(!validation.isValidEmail);
    setPasswordError(!validation.isValidPassword);
    setAuthError(false);

    if (validation.isValidInput){
      loginMutation({variables: {
        input: { 
          email: email, 
          password: password
        }
      }});
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}>

          <Title>Bem-Vindo(a) à Taqtile!</Title>

          <FormField 
            label='E-mail'
            validationError= {emailError}
            validationMessage='Insira um endereço de e-mail válido!'
            onChangeText={(e) => setEmail(e)}
          />

          <FormField 
            label='Senha'
            validationError= {passwordError}
            validationMessage= "Insira uma senha válida!"
            onChangeText={(p) => setPassword(p)}
          />

          <ActionButton 
            label='Entrar'
            loading={loading}
            handlePress={handleSubmit}
          />
          {authError && <ErrorMessage>{error?.message}</ErrorMessage>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
