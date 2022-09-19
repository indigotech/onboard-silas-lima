import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native';
import { setStorageValue } from '../persistency';
import { validateLogin } from '../validator';
import { client } from '../services/apollo';
import { useMutation } from '@apollo/client';
import { loginMutationGQL } from '../graphql/mutations';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { useState } from 'react';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { ActionButton, ErrorMessage, FormField, Title, View } from '../styled-components';
import { LoginValidation } from '../interfaces/validations';

export const LoginPage = (props: NavigationComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validation, setValidation] = useState<LoginValidation>({
    email: {
      isValid: true,
      errorMessage: '',
    },
    password: {
      isValid: true,
      errorMessage: '',
    },
  });

  const [authError, setAuthError] = useState(false);

  const [loginMutation, { loading, error }] = useMutation(loginMutationGQL, {
    client: client,
    onCompleted: (data) => {
      setStorageValue('@token', data.login.token);
      Navigation.push(props.componentId, {
        component: {
          name: 'usersPage',
        },
      });
    },
    onError: () => {
      setAuthError(true);
    },
  });

  const handleSubmit = () => {
    const loginValidation = validateLogin(email, password);
    const isValidInput = Object.values(loginValidation).every((input) => input.isValid);

    setValidation(loginValidation);
    setAuthError(false);

    if (isValidInput) {
      loginMutation({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior='automatic' style={backgroundStyle}>
        <View isDarkMode={isDarkMode}>
          <Title>Bem-Vindo(a) à Taqtile!</Title>

          <FormField label='E-mail' validation={validation.email} onChangeText={setEmail} />

          <FormField label='Senha' validation={validation.password} onChangeText={setPassword} />

          <ActionButton label='Entrar' loading={loading} handlePress={handleSubmit} />
          {authError && <ErrorMessage>{error?.message}</ErrorMessage>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
