import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { Styles } from './styles';
import { setValue } from './persistency';
import { loginValidator } from './regex';
import { client } from './services/apollo';
import { useMutation } from '@apollo/client';
import { loginMutationGQL } from './graphql/mutations';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, {useState, type PropsWithChildren} from 'react';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={Styles.sectionContainer}>
      <Text
        style={[
          Styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          Styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
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
        setValue('@token', data.login.token);
      },
      onError: () => {
        setAuthError(true);
      }
    });
  
  const handleSubmit = () => {
    const validation = loginValidator(email, password);

    setEmailError(!validation.isValidEmail);
    setPasswordError(!validation.isValidPassword);
    setAuthError(false);

    if (validation.isValidEmail && validation.isValidPassword){
      loginMutation({variables: {input: { email: email, password: password}}});
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
          <Section title="Bem-Vindo(a) à Taqtile!"/>

          <Text style={Styles.inputTitle}> E-mail </Text>
          {emailError && <Text style={Styles.errorMessage}>
            Insira um endereço de e-mail válido!
          </Text>}
          <TextInput 
            value={email} 
            keyboardType='email-address'
            style={Styles.inputContainer} 
            onChangeText={(e) => setEmail(e)}
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
            style={Styles.inputContainer} 
            onChangeText={(p) => setPassword(p)}
          />
          
          <Button title={'Entrar'} onPress={handleSubmit} disabled={loading} color="#841584"/>
          {authError &&<Text style={Styles.errorMessage}>{error?.message}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
