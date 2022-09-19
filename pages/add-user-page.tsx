import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createUserMutationGQL } from '../graphql/mutations';
import { signinValidator } from '../regex';
import { client } from '../services/apollo';
import { Title } from '../styled-components';
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
          }}>
          <Title>Cadastrar Usuário</Title>
          <Text style={Styles.inputTitle}> Nome </Text>
          {nameError && <Text style={Styles.errorMessage}>Insira um nome válido!</Text>}
          <TextInput value={name} style={Styles.userInfoContainer} onChangeText={(n) => setName(n)} />

          <Text style={Styles.inputTitle}> E-mail </Text>
          {emailError && <Text style={Styles.errorMessage}>Insira um endereço de e-mail válido!</Text>}
          <TextInput
            value={email}
            keyboardType='email-address'
            style={Styles.userInfoContainer}
            onChangeText={(e) => setEmail(e)}
          />

          <Text style={Styles.inputTitle}> Telefone </Text>
          {phoneError && <Text style={Styles.errorMessage}>Insira um número de telefone válido!</Text>}
          <TextInput value={phone} style={Styles.userInfoContainer} onChangeText={(p) => setPhone(p)} />

          <Text style={Styles.inputTitle}> Data de Nascimento </Text>
          {birthDateError && <Text style={Styles.errorMessage}>Insira uma data válida (formato: YYYY-MM-DD)!</Text>}
          <TextInput
            placeholder='FORMATO YYYY-MM-DD'
            value={birthDate}
            style={Styles.userInfoContainer}
            onChangeText={(bd) => setBirthDate(bd)}
          />

          <Text style={Styles.inputTitle}> Senha </Text>
          {passwordError && (
            <Text style={Styles.errorMessage}>
              Insira uma senha válida!
              {'\n'}- Mínimo de 7 caracteres
              {'\n'}- Mínimo de 1 dígito e 1 letra
            </Text>
          )}
          <TextInput
            value={password}
            secureTextEntry={true}
            style={Styles.userInfoContainer}
            onChangeText={(p) => setPassword(p)}
          />

          <Text style={Styles.inputTitle}> Cargo </Text>
          {roleError && <Text style={Styles.errorMessage}>Selecione um Cargo!</Text>}
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

          <TouchableOpacity
            onPress={handleSubmit}
            style={{ ...Styles.button, backgroundColor: loading ? '#FEB800' : '#841584' }}
          >
            {loading && <ActivityIndicator color='#00002D' />}
            <Text style={{ ...Styles.sectionTitle, color: loading ? '#AAAAAA' : '#FFFFFF' }}>Cadastrar</Text>
          </TouchableOpacity>
          {createUserError && <Text style={Styles.errorMessage}>{error?.message}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
