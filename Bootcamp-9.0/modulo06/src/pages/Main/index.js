import React from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends React.Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    console.log(users);
    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  componentDidUpdate(_, prevState) {
    const {users} = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const {users, newUser} = this.state;

    this.setState({loading: true});

    const response = await api.get(`/users/${newUser}`);
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  render() {
    const {users, newUser, loading} = this.state;
    return (
      <>
        <Container>
          <Form>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Adicionar usuários"
              value={newUser}
              onChangeText={text => this.setState({newUser: text})}
              returnKeyType="send"
            />
            <SubmitButton loading={loading} onPress={this.handleAddUser}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Icon name="add" size={20} color="#FFF" />
              )}
            </SubmitButton>
          </Form>

          <List
            data={users}
            keyExtractor={user => user.login}
            renderItem={({item}) => (
              <User>
                <Avatar source={{uri: item.avatar}} />
                <Name>{item.name}</Name>
                <Bio>{item.bio}</Bio>

                <ProfileButton onPress={() => {}}>
                  <ProfileButtonText>Ver pergfil</ProfileButtonText>
                </ProfileButton>
              </User>
            )}
          />
        </Container>
      </>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};
