import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import StackWrapper from "../navigation/StackWrapper";
import * as SecureStore from 'expo-secure-store';

function ProfileScreen() {
  const [pushToken, setPushToken] = useState('');

  useEffect(() => {
    (async() => {
      setPushToken(await SecureStore.getItemAsync('pushToken'));
    })();
  }, []);

  return (
    <View>
      <Text>{pushToken}</Text>
      <Button
        title="Create User"
        onPress={async () => {
          const response = await fetch('https://grocerserver.herokuapp.com/users', {
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
              role: 'Worker'
            })
          });
        }}
      />
      <Button
        title="Login"
        onPress={() => {

        }}
      />
    </View>
  );
}

export default StackWrapper(ProfileScreen);
