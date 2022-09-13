import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { signinValidator } from '../regex';
import { Section } from '../section';
import { Styles } from '../styles';

export const AddUserPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const handleSubmit = () => {
    const validation = signinValidator(name, email, phone, birthDate, password, role);

    setNameError(!validation.isValidName);
    setEmailError(!validation.isValidEmail);
    setPhoneError(!validation.isValidPhone);
    setBirthDateError(!validation.isValidBirthDate);
    setPasswordError(!validation.isValidPassword);
    setRoleError(!validation.isValidRole);
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
          <Section title="Cadastrar Usuário"/>
          <Text style={Styles.inputTitle}> Nome </Text>
          {nameError && <Text style={Styles.errorMessage}>
            Insira um nome válido!
          </Text>}
          <TextInput 
            value={name}
            style={Styles.signinInputContainer} 
            onChangeText={(n) => setName(n)}
          />

          <Text style={Styles.inputTitle}> E-mail </Text>
          {emailError && <Text style={Styles.errorMessage}>
            Insira um endereço de e-mail válido!
          </Text>}
          <TextInput 
            value={email} 
            keyboardType='email-address'
            style={Styles.signinInputContainer} 
            onChangeText={(e) => setEmail(e)}
          />

          <Text style={Styles.inputTitle}> Telefone </Text>
          {phoneError && <Text style={Styles.errorMessage}>
            Insira um número de telefone válido!
          </Text>}
          <TextInput 
            value={phone}
            style={Styles.signinInputContainer} 
            onChangeText={(p) => setPhone(p)}
          />

          <Text style={Styles.inputTitle}> Data de Nascimento </Text>
          {birthDateError && <Text style={Styles.errorMessage}>
            Insira uma data válida (formato: YYYY-MM-DD)!
          </Text>}
          <TextInput 
            placeholder='FORMATO YYYY-MM-DD'
            value={birthDate}
            style={Styles.signinInputContainer} 
            onChangeText={(bd) => setBirthDate(bd)}
          />

          <Text style={Styles.inputTitle}> Senha </Text>
          {passwordError && <Text style={Styles.errorMessage}>
            Insira uma senha válida!
            {'\n'}- Mínimo de 7 caracteres
            {'\n'}- Mínimo de 1 dígito e 1 letra
          </Text>}
          <TextInput
            value={password}
            secureTextEntry={true}
            style={Styles.signinInputContainer} 
            onChangeText={(p) => setPassword(p)}
          />

          <Text style={Styles.inputTitle}> Cargo </Text>
          {roleError && <Text style={Styles.errorMessage}>
            Selecione um Cargo!
          </Text>}
          <TouchableOpacity 
              onPress={() => setRole("admin")}
              style={{
                ...Styles.roleSelector, 
                backgroundColor: role == "admin" ? "black": "white"
              }}
            >
              <Text style={{color: role == "admin" ? "white": "black"}}>
                Administrador
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setRole("user")}
              style={{
                ...Styles.roleSelector, 
                backgroundColor: role == "user" ? "black": "white"
              }}
            >
              <Text style={{color: role == "user" ? "white": "black"}}>
                Usuário
              </Text>
            </TouchableOpacity>
          
            <TouchableOpacity 
              onPress={handleSubmit}
              style={{...Styles.button,
              backgroundColor: "black"}}
            >
              <Text style={{...Styles.sectionTitle, color: "white"}}>
                Entrar
              </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
