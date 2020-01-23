import React from 'react';
import {Keyboard} from 'react-native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Form, Input, SubmitButton, List, User, Avatar} from './styles';

export default class Main extends React.Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = async () => {
    const {users, newUser} = this.state;

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
    });

    Keyboard.dismiss();
  };

  render() {
    const {users, newUser} = this.state;
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
            <SubmitButton onPress={this.handleAddUser}>
              <Icon name="add" size={20} color="#FFF" />
            </SubmitButton>
          </Form>

          <List
            data={users}
            keyExtractor={user => user.login}
            renderItem={({item})=> (
              <User>
                <Avatar />
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