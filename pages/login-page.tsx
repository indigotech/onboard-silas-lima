import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Styles } from '../styles';
import { setStorageValue } from '../persistency';
import { loginValidator } from '../regex';
import { client } from '../services/apollo';
import { useMutation } from '@apollo/client';
import { loginMutationGQL } from '../graphql/mutations';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { useState } from 'react';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { ButtonContainer, ButtonLabel, FormError, FormField, FormLabel, Title } from '../styled-components';

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
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Title>Bem-Vindo(a) à Taqtile!</Title>

          <FormLabel> E-mail </FormLabel>
          <FormField 
            value={email} 
            keyboardType='email-address'
            onChangeText={(e) => setEmail(e)}
          />
          {emailError && <FormError> Insira um endereço de e-mail válido! </FormError>}

          <FormLabel> Senha </FormLabel>
          <FormField
            value={password}
            secureTextEntry={true}
            onChangeText={(p) => setPassword(p)}
          />
          {passwordError && <FormError>
            Insira uma senha válida!
            {'\n'}- Mínimo de 7 caracteres
            {'\n'}- Mínimo de 1 dígito e 1 letra
          </FormError>}
          
          <ButtonContainer onPress={handleSubmit} disabled={loading}>
            {loading && <ActivityIndicator color="#00002D"/>}
            <ButtonLabel> Entrar </ButtonLabel>
          </ButtonContainer>
          {authError &&<Text style={Styles.errorMessage}>{error?.message}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
