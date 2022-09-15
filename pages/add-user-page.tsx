import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, useColorScheme, View } from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createUserMutationGQL } from '../graphql/mutations';
import { signinValidator } from '../regex';
import { client } from '../services/apollo';
import { ActionButton, ErrorMessage, FormField, FormLabel, Title, OptionSelector } from '../styled-components';
import { UserRole } from '../types/UserRole';

export const AddUserPage = (props: NavigationComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>();

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const [createUserError, setCreateUserError] = useState(false);

  const [addUserMutation, { loading, error }] = useMutation(createUserMutationGQL, {
    client: client,
    onCompleted: (data) => {
      Alert.alert(
        'Usuario Cadastrado!',
        `O usuário ${data.createUser.name} - id ${data.createUser.id} foi cadastrado com sucesso.`,
      );
      Navigation.push(props.componentId, {
        component: {
          name: 'usersPage',
        },
      });
    },
    onError: () => {
      setCreateUserError(true);
    },
  });

  const handleSubmit = () => {
    const validation = signinValidator(name, email, phone, birthDate, password, role);

    setNameError(!validation.isValidName);
    setEmailError(!validation.isValidEmail);
    setPhoneError(!validation.isValidPhone);
    setBirthDateError(!validation.isValidBirthDate);
    setPasswordError(!validation.isValidPassword);
    setRoleError(!validation.isValidRole);
    setCreateUserError(false);

    if (validation.isValidInput) {
      addUserMutation({
        variables: {
          input: {
            name: name,
            email: email,
            phone: phone,
            birthDate: birthDate,
            password: password,
            role: role === 'user' ? 'user' : 'admin',
          },
        },
      });
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior='automatic' style={backgroundStyle}>
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
          <Title>Cadastrar Usuário</Title>

          <FormField
            label='Nome'
            validationError={nameError}
            validationMessage='Insira um nome válido!'
            onChangeText={(n) => setName(n)}
          />

          <FormField
            label='E-mail'
            validationError={emailError}
            validationMessage='Insira um endereço de e-mail válido!'
            onChangeText={(e) => setEmail(e)}
          />

          <FormField
            label='Telefone'
            validationError={phoneError}
            validationMessage='Insira um número de telefone válido!'
            onChangeText={(p) => setPhone(p)}
          />

          <FormField
            label='Data de Nascimento'
            placeholder='FORMATO YYYY-MM-DD'
            validationError={birthDateError}
            validationMessage='Insira uma data válida (formato: YYYY-MM-DD)!'
            onChangeText={(bd) => setBirthDate(bd)}
          />

          <FormField
            label='Senha'
            validationError={passwordError}
            validationMessage='Insira uma senha válida!'
            onChangeText={(p) => setPassword(p)}
          />

          <FormLabel invalidInput={roleError}> Cargo </FormLabel>
          <OptionSelector option={'Administrador'} selectedOption={role === 'admin'} onPress={() => setRole('admin')} />
          <OptionSelector option={'Usuário'} selectedOption={role === 'user'} onPress={() => setRole('user')} />
          {roleError && <ErrorMessage> Selecione um Cargo! </ErrorMessage>}

          <ActionButton label='Cadastrar' loading={loading} handlePress={handleSubmit} />
          {createUserError && <ErrorMessage>{error?.message}</ErrorMessage>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
