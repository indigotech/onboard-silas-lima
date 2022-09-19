import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createUserMutationGQL } from '../graphql/mutations';
import { validateSignUp } from '../validator';
import { client } from '../services/apollo';
import { ActionButton, ErrorMessage, FormField, FormLabel, Title, OptionSelector, View } from '../styled-components';
import { UserRole } from '../types/UserRole';
import { SignUpValidation } from '../interfaces/validations';

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

  const [validation, setValidation] = useState<SignUpValidation>({
    name: {
      isValid: true,
      errorMessage: '',
    },
    email: {
      isValid: true,
      errorMessage: '',
    },
    phone: {
      isValid: true,
      errorMessage: '',
    },
    birthDate: {
      isValid: true,
      errorMessage: '',
    },
    password: {
      isValid: true,
      errorMessage: '',
    },
    role: {
      isValid: true,
      errorMessage: '',
    },
  });

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
    const signUpValidation = validateSignUp(name, email, phone, birthDate, password, role);
    const isValidInput = Object.values(signUpValidation).every((isValid) => isValid);

    setValidation(signUpValidation);
    setCreateUserError(false);

    if (isValidInput) {
      addUserMutation({
        variables: {
          input: {
            name: name,
            email: email,
            phone: phone,
            birthDate: birthDate,
            password: password,
            role: role,
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
          <Title>Cadastrar Usuário</Title>

          <FormField label='Nome' validation={validation.name} onChangeText={setName} />

          <FormField label='E-mail' validation={validation.email} onChangeText={setEmail} />

          <FormField label='Telefone' validation={validation.phone} onChangeText={setPhone} />

          <FormField
            label='Data de Nascimento'
            placeholder='FORMATO YYYY-MM-DD'
            validation={validation.birthDate}
            onChangeText={setBirthDate}
          />

          <FormField label='Senha' validation={validation.password} onChangeText={setPassword} />

          <FormLabel isValidInput={validation.role.isValid}> Cargo </FormLabel>
          <OptionSelector option={'Administrador'} selectedOption={role === 'admin'} onPress={() => setRole('admin')} />
          <OptionSelector option={'Usuário'} selectedOption={role === 'user'} onPress={() => setRole('user')} />
          {!validation.role.isValid && <ErrorMessage> {validation.role.errorMessage} </ErrorMessage>}

          <ActionButton label='Cadastrar' loading={loading} handlePress={handleSubmit} />
          {createUserError && <ErrorMessage>{error?.message}</ErrorMessage>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
