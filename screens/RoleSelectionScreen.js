import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import StackWrapper from "../navigation/StackWrapper";
import * as SecureStore from 'expo-secure-store';
import UserContext from "../contexts/User";

function RoleSelectionScreen() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@gmail.com');

  const {user, setUser} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.notice}>
        If you're looking to test role-specific features of our app, you
        need to select a role that you wish to test. Keep in mind
        that specific features for some screens may not work if you haven't
        selected the appropriate role.
      </Text>
      <Input
        containerStyle={styles.input}
        label="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <Input
        containerStyle={styles.input}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        label="Last Name"
      />
      <Input
        containerStyle={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        label="Email"
      />
      <Button
        buttonStyle={styles.button}
        title="Become Shopper/Requestor"
        onPress={async () => {
          const pushToken = await SecureStore.getItemAsync('pushToken');
          const usersUrl = 'https://grocerserver.herokuapp.com/users';
          const response = await fetch(usersUrl, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              phoneNumber: '4161324634',
              email,
              firstName,
              lastName,
              role: 'Shopper',
              pushToken
            })
          });
          const result = await response.json();
          setUser(result);
          await SecureStore.setItemAsync('userId', result._id);
        }}
      />
      <Button
        buttonStyle={styles.button}
        title="Become Worker"
        onPress={() => {
          setUser(null);
        }}
      />
      <View style={{flex: -1, alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold'}}>Current Role:</Text>
        <Text>{user ? "Shopper/Requestor" : "Worker"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  button: {
    margin: 10
  },
  notice: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    marginVertical: 10
  }
});

export default StackWrapper(RoleSelectionScreen, {
  title: 'Change Role'
});
