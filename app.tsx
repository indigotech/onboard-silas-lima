import React, {useState, type PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { ApolloClient, InMemoryCache, useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const emailValidator = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+[.][a-zA-Z]+([.][a-zA-Z]+)?');
const passwordValidator = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{7,}');

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

const loginGQL = gql`
  mutation($input: LoginInputType!){
    login(data: $input)
    {
      token
    }
  }
`

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [authError, setAuthError] = useState(false);
  
  const [token, setToken] = useState('');
  
  const storeToken = async (value: string) => {
    try {
      await AsyncStorage.setItem('@token', value)
    } catch (e) {
      console.log(e);
    }
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value !== null) {
        setToken(value);
      }
      else{
        setToken('');
      }
    } catch(e) {
      console.log(e);
    }
  }

  const [loginMutation, {loading, error}] = useMutation(loginGQL, 
    {
      client: client, 
      onCompleted: (data) => {
        storeToken(data.login.token);
      },
      onError: () => {
        setAuthError(true);
      }
    });
  
  const handleSubmit = () => {
    const isValidEmail = !emailValidator.test(email);
    const isValidPassword = !passwordValidator.test(password);

    setEmailError(isValidEmail);
    setPasswordError(isValidPassword);
    setAuthError(false);

    if (!isValidEmail && !isValidPassword){
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

          <Text style={styles.inputTitle}> E-mail </Text>
          {emailError && <Text style={styles.errorMessage}>
            Insira um endereço de e-mail válido!
          </Text>}
          <TextInput 
            value={email} 
            keyboardType='email-address'
            style={styles.inputContainer} 
            onChangeText={(e) => setEmail(e)}
          />

          <Text style={styles.inputTitle}> Senha </Text>
          {passwordError && <Text style={styles.errorMessage}>
            Insira uma senha válida!
            {'\n'}- Mínimo de 7 caracteres
            {'\n'}- Mínimo de 1 dígito e 1 letra
          </Text>}
          <TextInput
            value={password}
            secureTextEntry={true}
            style={styles.inputContainer} 
            onChangeText={(p) => setPassword(p)}
          />
          
          <Button title={'Entrar'} onPress={handleSubmit} disabled={loading} color="#841584"/>
          {authError &&<Text style={styles.errorMessage}>{error?.message}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  inputTitle: {
    fontWeight: "400",
    marginLeft: 15,
  },
  inputContainer: {
    height: 60,
    margin: 15,
    marginBottom: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: "#AAAAAA",
    borderRadius: 10,
  },
  errorMessage: {
    marginLeft: 15,
    color: 'red',
  }
});

export default App;
