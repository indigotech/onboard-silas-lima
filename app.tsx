/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {type PropsWithChildren} from 'react';
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
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
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
           <Text style={styles.inputTitle}>E-mail</Text>
           <TextInput style={styles.inputContainer}></TextInput>
           <Text style={styles.inputTitle}>Senha</Text>
           <TextInput style={styles.inputContainer}></TextInput>
           <Button title='Entrar' color="#841584"/>
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
 });
 
 
 export default App;
 