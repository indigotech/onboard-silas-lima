import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Section } from '../section';
import { Styles } from '../styles';
import { usersQueryGQL } from '../graphql/querys';
import { client } from '../services/apollo';
import { NetworkStatus, useQuery } from '@apollo/client';
import { User } from '../interfaces/users';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';

export const UsersPage = (props: NavigationComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const redirectAddUserPage = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'addUserPage'
      }
    });
  }

  const [offset, setOffset] = useState(25);

  const {data, error, fetchMore, networkStatus} = useQuery(usersQueryGQL,
    {
      client: client,
      variables: {input: { offset: 0, limit: 25}},
      onError: () => {
        console.log(error);
      },
      notifyOnNetworkStatusChange: true
    }
  );

  const fetchingMore = networkStatus === NetworkStatus.fetchMore;

  const loadMoreUsers = () => {
    if (!fetchingMore){
      setOffset(offset+25);
      fetchMore({variables: {input: { offset: offset, limit: 25}}});
    }
  }

  const renderUser = (item: User) => {
    return (
      <Text style={Styles.userList}>
        Usuário {item.id}: {item.name}{'\n'}
        Email: {item.email}
      </Text>
    )
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Lista de Usuários"/>
          <TouchableOpacity 
            onPress={redirectAddUserPage}
            style={{...Styles.button, backgroundColor: "#841584"}}
          >
            <Text style={{...Styles.sectionTitle, color: "white"}}>
              Adicionar Novo Usuário
            </Text>
          </TouchableOpacity>
          <FlatList 
            data={data?.users.nodes}
            renderItem={({item}) => renderUser(item)}
            keyExtractor={(item) => item.id}
            onEndReached={loadMoreUsers}
            onEndReachedThreshold={0.25}
            ListFooterComponent={fetchingMore ? <ActivityIndicator></ActivityIndicator> : null}
          /> 
      </View>
    </SafeAreaView>
  );
};
