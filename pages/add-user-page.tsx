import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createUserMutationGQL } from '../graphql/mutations';
import { signinValidator } from '../regex';
import { client } from '../services/apollo';
import { ButtonContainer, ButtonLabel, FormError, FormField, FormLabel, Title } from '../styled-components';
import { Styles } from '../styles';
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
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Title>Cadastrar Usuário</Title>

          <FormLabel> Nome </FormLabel>
          <FormField value={name} onChangeText={(n) => setName(n)} />
          {nameError && <FormError> Insira um nome válido! </FormError>}

          <FormLabel> E-mail </FormLabel>
          <FormField value={email} keyboardType='email-address' onChangeText={(e) => setEmail(e)} />
          {emailError && <FormError> Insira um endereço de e-mail válido! </FormError>}

          <FormLabel> Telefone </FormLabel>
          <FormField value={phone} onChangeText={(p) => setPhone(p)} />
          {phoneError && <FormError> Insira um número de telefone válido! </FormError>}

          <FormLabel> Data de Nascimento </FormLabel>
          <FormField placeholder='FORMATO YYYY-MM-DD' value={birthDate} onChangeText={(bd) => setBirthDate(bd)} />
          {birthDateError && <FormError> Insira uma data válida (formato: YYYY-MM-DD)! </FormError>}

          <FormLabel> Senha </FormLabel>
          <FormField value={password} secureTextEntry={true} onChangeText={(p) => setPassword(p)} />
          {passwordError && (
            <FormError>
              Insira uma senha válida!
              {'\n'}- Mínimo de 7 caracteres
              {'\n'}- Mínimo de 1 dígito e 1 letra
            </FormError>
          )}

          <FormLabel> Cargo </FormLabel>
          <TouchableOpacity
            onPress={() => setRole('admin')}
            style={{
              ...Styles.roleSelector,
              backgroundColor: role == 'admin' ? 'black' : 'white',
            }}
          >
            <Text style={{ color: role == 'admin' ? 'white' : 'black' }}>Administrador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRole('user')}
            style={{
              ...Styles.roleSelector,
              backgroundColor: role == 'user' ? 'black' : 'white',
            }}
          >
            <Text style={{ color: role == 'user' ? 'white' : 'black' }}>Usuário</Text>
          </TouchableOpacity>
          {roleError && <FormError> Selecione um Cargo! </FormError>}

          <ButtonContainer onPress={handleSubmit}>
            {loading && <ActivityIndicator color='#00002D' />}
            <ButtonLabel> Cadastrar </ButtonLabel>
          </ButtonContainer>
          {createUserError && <Text style={Styles.errorMessage}>{error?.message}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
