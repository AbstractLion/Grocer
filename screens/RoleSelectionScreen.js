import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import StackWrapper from "../navigation/StackWrapper";
import * as SecureStore from 'expo-secure-store';
import UserContext from "../contexts/User";

function RoleSelectionScreen() {
  const [pushToken, setPushToken] = useState('');
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    (async() => {
      setPushToken(await SecureStore.getItemAsync('pushToken'));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.notice}>
        If you're looking to test role-specific features of our app, you
        need to select a role that you wish to test. If you're just looking
        for a general concept and overview, you can press the menu in the
        top left corner and navigate to all the screens, but keep in mind
        that specific features for those screens may not work if you haven't
        selected a role.
      </Text>
      <Button
        buttonStyle={styles.button}
        title="Become Shopper"
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
              email: 'john.doe@gmail.com',
              firstName: 'John',
              lastName: 'Doe',
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
        title="Become Requestor"
        onPress={() => {

        }}
      />
      <Button
        buttonStyle={styles.button}
        title="Become Worker"
        onPress={() => {
        }}
      />
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
  }
});
export default StackWrapper(RoleSelectionScreen, {
  title: 'Change Role'
});
